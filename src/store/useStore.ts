import { create } from 'zustand';
import {
  Lead,
  Survey,
  Quote,
  QuoteItem,
  Order,
  Product,
  SerialNumber,
  Dispatch,
  Job,
  Warranty,
  ServiceTicket,
  Invoice,
  Notification,
  AuditLog,
  LeadStatus,
  SystemType,
  DataSource,
} from '../types';
import {
  demoLeads,
  demoSurveys,
  demoQuotes,
  demoOrders,
  demoProducts,
  demoSerialNumbers,
  demoDispatches,
  demoJobs,
  demoWarranties,
  demoServiceTickets,
  demoInvoices,
  demoNotifications,
  demoAuditLogs,
  demoDataSources,
} from '../data/demoData';

interface AppState {
  leads: Lead[];
  surveys: Survey[];
  quotes: Quote[];
  orders: Order[];
  products: Product[];
  serialNumbers: SerialNumber[];
  dispatches: Dispatch[];
  jobs: Job[];
  warranties: Warranty[];
  tickets: ServiceTicket[];
  invoices: Invoice[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  dataSources: DataSource[];

  // Lead actions
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'activities'>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus, note?: string) => void;
  assignLead: (leadId: string, userId: string, userName: string) => void;

  // Survey actions
  createOrUpdateSurvey: (survey: Omit<Survey, 'id' | 'createdAt' | 'updatedAt'>) => Survey;
  approveSurvey: (surveyId: string, approvedBy: string) => void;

  // Quote actions
  createQuote: (params: {
    leadId: string;
    systemType: SystemType;
    capacityKw: number;
    packageType: string;
    discountPercent?: number;
    advancePercent?: number;
    createdBy: string;
  }) => Quote;
  acceptQuote: (quoteId: string, acceptedBy: string) => Order;

  // Dispatch & Inventory actions
  reserveSerialsForOrder: (orderId: string) => void;
  dispatchOrder: (orderId: string, technicianId: string, serialIds: string[], dispatchedBy: string) => Dispatch;

  // Job actions
  updateJobChecklist: (jobId: string, itemId: string, completed: boolean) => void;
  addJobPhoto: (jobId: string, photoUrl: string, caption: string, stage: 'before' | 'during' | 'after', location?: { lat: number; lng: number }) => void;
  completeJob: (jobId: string, signatureDataUrl: string, signerName: string) => void;

  // Ticket actions
  createTicket: (ticket: Omit<ServiceTicket, 'id' | 'createdAt' | 'updatedAt' | 'updates'>) => ServiceTicket;
  updateTicketStatus: (ticketId: string, status: ServiceTicket['status'], note?: string, updatedBy?: string) => void;

  // Notifications & Audit
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addAuditLog: (action: string, entityType: string, entityId: string, changes?: Record<string, any>) => void;
}

export const useStore = create<AppState>((set, get) => ({
  leads: demoLeads,
  surveys: demoSurveys,
  quotes: demoQuotes,
  orders: demoOrders,
  products: demoProducts,
  serialNumbers: demoSerialNumbers,
  dispatches: demoDispatches,
  jobs: demoJobs,
  warranties: demoWarranties,
  tickets: demoServiceTickets,
  invoices: demoInvoices,
  notifications: demoNotifications,
  auditLogs: demoAuditLogs,
  dataSources: demoDataSources,

  addLead: (leadData) => {
    const id = `lead-${Date.now()}`;
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...leadData,
      id,
      createdAt: now,
      updatedAt: now,
      activities: [
        {
          id: `act-${Date.now()}`,
          leadId: id,
          type: 'created',
          title: 'Lead Created',
          description: `Lead created from source: ${leadData.source}`,
          timestamp: now,
          userName: 'System',
        },
      ],
    };

    set((state) => ({
      leads: [newLead, ...state.leads],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          userId: 'user-sales-manager',
          title: 'New Lead Captured',
          message: `${newLead.customerName} requested a ${newLead.preferredCapacityKw}kW ${newLead.preferredSystemType} system.`,
          type: 'info',
          link: `/leads/${newLead.id}`,
          isRead: false,
          createdAt: now,
        },
        ...state.notifications,
      ],
    }));

    get().addAuditLog('LEAD_CREATE', 'lead', id, { name: newLead.customerName, source: newLead.source });
    return newLead;
  },

  updateLeadStatus: (leadId, status, note) => {
    const now = new Date().toISOString();
    set((state) => ({
      leads: state.leads.map((l) => {
        if (l.id === leadId) {
          const updatedActivities = [
            ...l.activities,
            {
              id: `act-${Date.now()}`,
              leadId,
              type: 'status_change' as const,
              title: `Status updated to ${status}`,
              description: note || `Pipeline state progressed to ${status}`,
              timestamp: now,
              userName: 'Current User',
            },
          ];
          return { ...l, status, updatedAt: now, activities: updatedActivities };
        }
        return l;
      }),
    }));
    get().addAuditLog('LEAD_STATUS_UPDATE', 'lead', leadId, { status, note });
  },

  assignLead: (leadId, userId, userName) => {
    const now = new Date().toISOString();
    set((state) => ({
      leads: state.leads.map((l) => {
        if (l.id === leadId) {
          return {
            ...l,
            assignedTo: userId,
            updatedAt: now,
            activities: [
              ...l.activities,
              {
                id: `act-${Date.now()}`,
                leadId,
                type: 'note' as const,
                title: `Lead Assigned`,
                description: `Assigned to ${userName}`,
                timestamp: now,
                userName: 'Manager',
              },
            ],
          };
        }
        return l;
      }),
    }));
    get().addAuditLog('LEAD_ASSIGN', 'lead', leadId, { assignedTo: userName });
  },

  createOrUpdateSurvey: (surveyData) => {
    const now = new Date().toISOString();
    const existing = get().surveys.find((s) => s.leadId === surveyData.leadId);
    let resultSurvey: Survey;

    if (existing) {
      resultSurvey = { ...existing, ...surveyData, updatedAt: now };
      set((state) => ({
        surveys: state.surveys.map((s) => (s.id === existing.id ? resultSurvey : s)),
      }));
    } else {
      resultSurvey = {
        ...surveyData,
        id: `srv-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      set((state) => ({
        surveys: [resultSurvey, ...state.surveys],
      }));
    }

    // Update lead status to survey completed
    get().updateLeadStatus(surveyData.leadId, 'survey_completed', `Survey submitted with ${surveyData.recommendedCapacityKw} kW recommended.`);
    return resultSurvey;
  },

  approveSurvey: (surveyId, approvedBy) => {
    const now = new Date().toISOString();
    set((state) => ({
      surveys: state.surveys.map((s) => {
        if (s.id === surveyId) {
          return { ...s, isApproved: true, approvedBy, updatedAt: now };
        }
        return s;
      }),
    }));

    const survey = get().surveys.find((s) => s.id === surveyId);
    if (survey) {
      get().updateLeadStatus(survey.leadId, 'qualified', `Survey approved by ${approvedBy}. Ready for quotation.`);
    }
    get().addAuditLog('SURVEY_APPROVE', 'survey', surveyId, { approvedBy });
  },

  createQuote: ({ leadId, systemType, capacityKw, packageType, discountPercent = 0, advancePercent = 20, createdBy }) => {
    const now = new Date().toISOString();
    const quoteNumber = `QT-2024-${String(get().quotes.length + 1).padStart(4, '0')}`;
    const products = get().products;

    // Automatic Bill of Materials generation
    const items: QuoteItem[] = [];
    const panelProduct = products.find((p) => p.category === 'panel')!;
    const panelCount = Math.ceil((capacityKw * 1000) / 400); // 400W panels
    items.push({
      id: `qi-p-${Date.now()}`,
      productId: panelProduct.id,
      productName: `${panelProduct.name} (${panelProduct.sku})`,
      category: 'panel',
      quantity: panelCount,
      unitPrice: panelProduct.sellingPrice,
      totalPrice: panelCount * panelProduct.sellingPrice,
      unitCost: panelProduct.costPrice,
      totalCost: panelCount * panelProduct.costPrice,
    });

    // Inverter
    const inverterProduct = products.find((p) => p.category === 'inverter')!;
    items.push({
      id: `qi-i-${Date.now()}`,
      productId: inverterProduct.id,
      productName: `${inverterProduct.name} (${capacityKw}kW)`,
      category: 'inverter',
      quantity: 1,
      unitPrice: inverterProduct.sellingPrice,
      totalPrice: inverterProduct.sellingPrice,
      unitCost: inverterProduct.costPrice,
      totalCost: inverterProduct.costPrice,
    });

    // Battery if Off-Grid
    if (systemType === 'off_grid') {
      const batteryProduct = products.find((p) => p.category === 'battery')!;
      const batteryCount = capacityKw >= 4 ? 2 : 1;
      items.push({
        id: `qi-b-${Date.now()}`,
        productId: batteryProduct.id,
        productName: `${batteryProduct.name} 5kWh`,
        category: 'battery',
        quantity: batteryCount,
        unitPrice: batteryProduct.sellingPrice,
        totalPrice: batteryCount * batteryProduct.sellingPrice,
        unitCost: batteryProduct.costPrice,
        totalCost: batteryCount * batteryProduct.costPrice,
      });

      const ccProduct = products.find((p) => p.category === 'charge_controller')!;
      items.push({
        id: `qi-c-${Date.now()}`,
        productId: ccProduct.id,
        productName: ccProduct.name,
        category: 'charge_controller',
        quantity: 1,
        unitPrice: ccProduct.sellingPrice,
        totalPrice: ccProduct.sellingPrice,
        unitCost: ccProduct.costPrice,
        totalCost: ccProduct.costPrice,
      });
    }

    // Mounting, Wiring, Safety, Service
    ['mounting', 'wiring_safety', 'service'].forEach((cat) => {
      const prod = products.find((p) => p.category === cat);
      if (prod) {
        items.push({
          id: `qi-${cat}-${Date.now()}`,
          productId: prod.id,
          productName: prod.name,
          category: prod.category,
          quantity: 1,
          unitPrice: prod.sellingPrice,
          totalPrice: prod.sellingPrice,
          unitCost: prod.costPrice,
          totalCost: prod.costPrice,
        });
      }
    });

    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalCost = items.reduce((sum, item) => sum + item.totalCost, 0);
    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const taxAmount = Math.round((subtotal - discountAmount) * 0.12); // 12% GST on solar
    const totalAmount = subtotal - discountAmount + taxAmount;
    const grossMargin = totalAmount - totalCost - taxAmount;
    const marginPercentage = Number(((grossMargin / (subtotal - discountAmount)) * 100).toFixed(2));
    const advanceAmount = Math.round((totalAmount * advancePercent) / 100);

    const newQuote: Quote = {
      id: `quote-${Date.now()}`,
      leadId,
      quoteNumber,
      version: 1,
      systemType,
      capacityKw,
      packageType,
      items,
      subtotal,
      discountAmount,
      taxAmount,
      totalAmount,
      totalCost,
      grossMargin,
      marginPercentage,
      advanceAmount,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'sent',
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      quotes: [newQuote, ...state.quotes],
    }));

    get().addAuditLog('QUOTE_CREATE', 'quote', newQuote.id, {
      quoteNumber,
      totalAmount,
      grossMargin,
      marginPercentage,
    });

    return newQuote;
  },

  acceptQuote: (quoteId, acceptedBy) => {
    const now = new Date().toISOString();
    const quote = get().quotes.find((q) => q.id === quoteId);
    if (!quote) throw new Error('Quote not found');

    const lead = get().leads.find((l) => l.id === quote.leadId);
    const orderNumber = `ORD-2024-${String(get().orders.length + 1).padStart(4, '0')}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      quoteId: quote.id,
      leadId: quote.leadId,
      customerId: lead?.id || 'cust-1',
      customerName: lead?.customerName || 'Alice Singh',
      customerPhone: lead?.phone || '+91 98401 23456',
      customerAddress: lead?.address || 'Chennai, Tamil Nadu',
      orderNumber,
      systemType: quote.systemType,
      capacityKw: quote.capacityKw,
      totalAmount: quote.totalAmount,
      advancePaid: quote.advanceAmount,
      balanceDue: quote.totalAmount - quote.advanceAmount,
      status: 'confirmed',
      paymentStatus: 'partial',
      items: quote.items,
      createdAt: now,
      updatedAt: now,
    };

    // Update quote
    set((state) => ({
      quotes: state.quotes.map((q) => (q.id === quoteId ? { ...q, status: 'accepted' as const, updatedAt: now } : q)),
      orders: [newOrder, ...state.orders],
    }));

    // Update lead
    if (lead) {
      get().updateLeadStatus(lead.id, 'converted', `Quote ${quote.quoteNumber} accepted. Order ${orderNumber} created.`);
    }

    // Auto-reserve serials
    get().reserveSerialsForOrder(newOrder.id);
    get().addAuditLog('ORDER_CREATE', 'order', newOrder.id, { orderNumber, acceptedBy });

    return newOrder;
  },

  reserveSerialsForOrder: (orderId) => {
    const order = get().orders.find((o) => o.id === orderId);
    if (!order) return;

    // Reserve available serials for high-value items
    const highValueCategories = ['panel', 'inverter', 'battery', 'charge_controller'];
    set((state) => {
      const updatedSerials = [...state.serialNumbers];
      order.items.forEach((item) => {
        if (highValueCategories.includes(item.category)) {
          let countToReserve = item.quantity;
          for (let i = 0; i < updatedSerials.length && countToReserve > 0; i++) {
            if (updatedSerials[i].productId === item.productId && updatedSerials[i].status === 'in_stock') {
              updatedSerials[i] = {
                ...updatedSerials[i],
                status: 'reserved',
                reservedForOrderId: orderId,
              };
              countToReserve--;
            }
          }
        }
      });
      return { serialNumbers: updatedSerials };
    });
  },

  dispatchOrder: (orderId, technicianId, serialIds, dispatchedBy) => {
    const now = new Date().toISOString();
    const order = get().orders.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');

    const dispatchNumber = `DSP-2024-${String(get().dispatches.length + 1).padStart(4, '0')}`;
    const dispatchItems = serialIds.map((sId) => {
      const serial = get().serialNumbers.find((s) => s.id === sId);
      return {
        id: `di-${Date.now()}-${sId}`,
        serialNumberId: sId,
        serialNumber: serial?.serialNumber || 'UNKNOWN',
        productId: serial?.productId || 'UNKNOWN',
        productName: serial?.productName || 'Equipment',
        category: serial?.category || 'panel',
      };
    });

    const newDispatch: Dispatch = {
      id: `disp-${Date.now()}`,
      orderId,
      dispatchNumber,
      technicianId,
      technicianName: 'Arun Kumar',
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      items: dispatchItems,
      scannedSerials: serialIds.map((id) => get().serialNumbers.find((s) => s.id === id)?.serialNumber || id),
      status: 'delivered',
      dispatchedAt: now,
      deliveredAt: now,
    };

    // Update serial statuses to dispatched/installed
    set((state) => ({
      serialNumbers: state.serialNumbers.map((s) => {
        if (serialIds.includes(s.id)) {
          return { ...s, status: 'installed' as const, currentJobId: `job-${orderId}` };
        }
        return s;
      }),
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status: 'dispatched' as const } : o)),
      dispatches: [newDispatch, ...state.dispatches],
    }));

    // Automatic Warranty Engine Activation
    const newWarranties: Warranty[] = serialIds.map((sId) => {
      const serial = get().serialNumbers.find((s) => s.id === sId)!;
      const startDate = now;
      const years = serial?.category === 'panel' ? 20 : serial?.category === 'battery' ? 5 : 2;
      const end = new Date(now);
      end.setFullYear(end.getFullYear() + years);

      return {
        id: `war-${Date.now()}-${sId}`,
        serialNumberId: sId,
        serialNumber: serial?.serialNumber || 'SN',
        productName: serial?.productName || 'Equipment',
        category: serial?.category || 'panel',
        customerId: order.customerId,
        customerName: order.customerName,
        customerPhone: order.customerPhone || '+91 98401 23456',
        jobId: `job-${orderId}`,
        warrantyPeriodYears: years,
        startDate,
        endDate: end.toISOString(),
        status: 'active' as const,
        certificateUrl: `/certificates/${serial?.serialNumber}.pdf`,
      };
    });

    // Create corresponding Job for field technician
    const newJob: Job = {
      id: `job-${orderId}`,
      orderId,
      jobNumber: `JOB-2024-${String(get().jobs.length + 1).padStart(4, '0')}`,
      technicianId,
      technicianName: 'Arun Kumar',
      customerName: order.customerName,
      customerPhone: order.customerPhone || '+91 98401 23456',
      customerAddress: order.customerAddress || 'Anna Nagar, Chennai, Tamil Nadu',
      customerCoordinates: { lat: 13.0827, lng: 80.2707 },
      systemType: order.systemType,
      capacityKw: order.capacityKw,
      status: 'scheduled',
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      checklist: [
        { id: 'c1', label: 'Mounting structure anchored & wind-tested', completed: false },
        { id: 'c2', label: 'Panels clamped with proper tilt & torque specs', completed: false },
        { id: 'c3', label: 'Earthing resistance checked (< 5 ohms)', completed: false },
        { id: 'c4', label: 'Inverter & Battery DC/AC wiring verified', completed: false },
        { id: 'c5', label: 'Generation meter test & grid sync confirmation', completed: false },
        { id: 'c6', label: 'Customer demonstration & mobile app pairing', completed: false },
      ],
      photos: [],
      installedSerials: serialIds.map((id) => get().serialNumbers.find((s) => s.id === id)?.serialNumber || id),
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      warranties: [...newWarranties, ...state.warranties],
      jobs: [newJob, ...state.jobs],
    }));

    get().addAuditLog('DISPATCH_CONFIRMED', 'dispatch', newDispatch.id, {
      dispatchNumber,
      warrantiesGenerated: newWarranties.length,
      dispatchedBy,
    });

    return newDispatch;
  },

  updateJobChecklist: (jobId, itemId, completed) => {
    set((state) => ({
      jobs: state.jobs.map((j) => {
        if (j.id === jobId) {
          const checklist = j.checklist.map((c) => (c.id === itemId ? { ...c, completed } : c));
          return { ...j, checklist, updatedAt: new Date().toISOString() };
        }
        return j;
      }),
    }));
  },

  addJobPhoto: (jobId, photoUrl, caption, stage, location) => {
    const now = new Date().toISOString();
    set((state) => ({
      jobs: state.jobs.map((j) => {
        if (j.id === jobId) {
          const photo = {
            id: `photo-${Date.now()}`,
            url: photoUrl,
            stage,
            caption,
            timestamp: now,
            location: location || { lat: 13.0827, lng: 80.2707 },
          };
          return { ...j, photos: [...j.photos, photo], updatedAt: now };
        }
        return j;
      }),
    }));
  },

  completeJob: (jobId, signatureDataUrl, signerName) => {
    const now = new Date().toISOString();
    const signature = {
      id: `sig-${Date.now()}`,
      signatureDataUrl,
      signerName,
      signerRole: 'Customer',
      timestamp: now,
      ipAddress: '106.51.240.12',
    };

    set((state) => ({
      jobs: state.jobs.map((j) => {
        if (j.id === jobId) {
          return {
            ...j,
            status: 'completed',
            completedAt: now,
            signature,
            testResults: {
              vocVolts: 245.8,
              iscAmps: 10.2,
              earthingResistanceOhms: 3.2,
              instantaneousPowerKw: j.capacityKw * 0.88,
              notes: 'Passed all BIS and Discom rooftop standards. Live generation verified.',
            },
            updatedAt: now,
          };
        }
        return j;
      }),
    }));

    get().addAuditLog('JOB_COMPLETED', 'job', jobId, { signerName, timestamp: now });
  },

  createTicket: (ticketData) => {
    const now = new Date().toISOString();
    const ticketNumber = `TCK-2024-${String(get().tickets.length + 1).padStart(4, '0')}`;
    const newTicket: ServiceTicket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      ticketNumber,
      createdAt: now,
      updatedAt: now,
      updates: [
        {
          id: `tup-${Date.now()}`,
          ticketId: `ticket-${Date.now()}`,
          status: ticketData.status,
          note: `Ticket created: ${ticketData.description}`,
          timestamp: now,
          userName: 'Support System',
        },
      ],
    };

    set((state) => ({
      tickets: [newTicket, ...state.tickets],
    }));

    get().addAuditLog('TICKET_CREATE', 'ticket', newTicket.id, { ticketNumber, issue: ticketData.issueType });
    return newTicket;
  },

  updateTicketStatus: (ticketId, status, note, updatedBy = 'Service Agent') => {
    const now = new Date().toISOString();
    set((state) => ({
      tickets: state.tickets.map((t) => {
        if (t.id === ticketId) {
          const update = {
            id: `tup-${Date.now()}`,
            ticketId,
            status,
            note: note || `Ticket updated to ${status}`,
            timestamp: now,
            userName: updatedBy,
          };
          return {
            ...t,
            status,
            resolvedAt: status === 'resolved' ? now : t.resolvedAt,
            closedAt: status === 'closed' ? now : t.closedAt,
            updates: [...t.updates, update],
            updatedAt: now,
          };
        }
        return t;
      }),
    }));

    get().addAuditLog('TICKET_STATUS_UPDATE', 'ticket', ticketId, { status, note });
  },

  markNotificationAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    }));
  },

  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    }));
  },

  addAuditLog: (action, entityType, entityId, changes) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      userId: 'current-user',
      userName: 'Alice / Director',
      userRole: 'Director',
      action,
      entityType,
      entityId,
      changes,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1',
    };
    set((state) => ({
      auditLogs: [newLog, ...state.auditLogs],
    }));
  },
}));
