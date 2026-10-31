import React, { useState, useRef } from 'react';
import {
  Wrench,
  Camera,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Shield,
  Upload,
  PenTool,
  Zap,
  Wifi,
  WifiOff,
  RefreshCw,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Job } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

export const Jobs: React.FC = () => {
  const { jobs, updateJobChecklist, addJobPhoto, completeJob } = useStore();
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);
  const [activePhotoStage, setActivePhotoStage] = useState<'before' | 'during' | 'after'>('after');
  const [signerName, setSignerName] = useState('Alice Singh');
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoCaption, setPhotoCaption] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'queued' | 'syncing'>('synced');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Digital Signature Canvas helpers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSignatureSubmit = () => {
    if (!selectedJob) return;
    const canvas = canvasRef.current;
    const dataUrl = canvas ? canvas.toDataURL() : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==';

    completeJob(selectedJob.id, dataUrl, signerName);
    setIsSignModalOpen(false);
    alert(`Job ${selectedJob.jobNumber} marked Commissioned & Completed! Customer signature and test certificates stored.`);
  };

  const handleSimulatePhotoUpload = () => {
    if (!selectedJob) return;
    // Photorealistic simulated solar rooftop photos
    const demoPhotos = {
      before: 'https://images.unsplash.com/photo-1548611716-ad772f778f56?auto=format&fit=crop&w=600&q=80',
      during: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    };

    addJobPhoto(
      selectedJob.id,
      demoPhotos[activePhotoStage],
      photoCaption || `Installed 540W Tier-1 Panels on south tilt (${activePhotoStage})`,
      activePhotoStage,
      selectedJob.customerCoordinates || { lat: 13.0827, lng: 80.2707 }
    );
    setIsPhotoModalOpen(false);
    setPhotoCaption('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Technician PWA Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Technician Field App & PWA
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              Mobile-First Dispatch
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Offline-first job execution for crews. Geotagged photographic proof, electrical test meter confirmation, and digital signature sign-off.
          </p>
        </div>

        {/* Offline / Online Sync Status Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsOnline(!isOnline);
              setSyncStatus(!isOnline ? 'synced' : 'queued');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{isOnline ? 'PWA Online (Synced)' : 'Offline Mode (Queued)'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout: Job List on Left, Field Workcard on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assigned Jobs */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Assigned Field Jobs ({jobs.length})
          </span>

          {jobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`card p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-500 shadow-md ring-1 ring-amber-500/30 bg-amber-500/5'
                    : 'hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                      {job.jobNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {job.customerName}
                    </span>
                  </div>
                  <StatusBadge status={job.status} />
                </div>

                <div className="text-xs text-slate-500 space-y-1 mt-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{job.customerAddress}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>{job.capacityKw} kW {job.systemType.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Job Workcard */}
        {selectedJob ? (
          <div className="lg:col-span-2 card p-6 space-y-6">
            {/* Job Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {selectedJob.jobNumber}
                  </h2>
                  <StatusBadge status={selectedJob.status} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Customer: {selectedJob.customerName} • {selectedJob.customerPhone} • {selectedJob.customerAddress}
                </p>
              </div>

              {selectedJob.status !== 'completed' && (
                <button
                  onClick={() => setIsSignModalOpen(true)}
                  className="btn-accent px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Customer Sign-off</span>
                </button>
              )}
            </div>

            {/* Checklist Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Installation Safety & Commissioning Checklist
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  {selectedJob.checklist.filter((c) => c.completed).length} / {selectedJob.checklist.length} Completed
                </span>
              </div>

              <div className="space-y-2">
                {selectedJob.checklist.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={(e) => updateJobChecklist(selectedJob.id, item.id, e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span
                      className={`font-medium ${
                        item.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Electrical Test Results Confirmation */}
            {selectedJob.testResults && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-2 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  ✓ Commissioning Electrical Tests Passed
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  <div>Voc: <strong className="text-slate-900 dark:text-white">{selectedJob.testResults.vocVolts} V</strong></div>
                  <div>Isc: <strong className="text-slate-900 dark:text-white">{selectedJob.testResults.iscAmps} A</strong></div>
                  <div>Earth: <strong className="text-slate-900 dark:text-white">{selectedJob.testResults.earthingResistanceOhms} Ω</strong></div>
                  <div>Output: <strong className="text-emerald-600 dark:text-emerald-400">{selectedJob.testResults.instantaneousPowerKw} kW</strong></div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] pt-1 border-t border-emerald-200/50">
                  {selectedJob.testResults.notes}
                </p>
              </div>
            )}

            {/* Geotagged Photographic Proof Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Geotagged Installation Photos ({selectedJob.photos.length})
                </h3>
                <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="btn-ghost px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Site Photo</span>
                </button>
              </div>

              {selectedJob.photos.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
                  No site photos uploaded yet. Capture before, during, and after photos with GPS tags.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedJob.photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-950/80 backdrop-blur-sm text-amber-400">
                          {photo.stage}
                        </span>
                      </div>
                      <div className="p-3 text-[11px] space-y-1">
                        <p className="font-semibold truncate">{photo.caption}</p>
                        <p className="text-slate-400 text-[10px] font-mono">
                          {photo.location ? `${photo.location.lat.toFixed(4)}°N, ${photo.location.lng.toFixed(4)}°E` : '13.0827°N, 80.2707°E'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Digital Signature Proof Card */}
            {selectedJob.signature && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Customer Sign-off Proof
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedJob.signature.signerName}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Signed at {new Date(selectedJob.signature.timestamp || selectedJob.signature.createdAt || Date.now()).toLocaleString()} • IP: {selectedJob.signature.ipAddress || '106.51.240.12'}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <img
                    src={selectedJob.signature.signatureDataUrl}
                    alt="Signature"
                    className="h-12 w-36 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* PHOTO UPLOAD MODAL */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Upload Geotagged Installation Proof"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="label">Installation Stage</label>
            <div className="grid grid-cols-3 gap-2">
              {(['before', 'during', 'after'] as const).map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => setActivePhotoStage(stage)}
                  className={`py-2 rounded-xl font-bold uppercase text-xs border transition-colors ${
                    activePhotoStage === stage
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Photo Caption / Equipment Focus</label>
            <input
              type="text"
              placeholder="e.g. 540W Mono PERC Panels mounted on south tilt structure"
              value={photoCaption}
              onChange={(e) => setPhotoCaption(e.target.value)}
              className="input"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-center space-y-2 border border-slate-800">
            <Camera className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="font-semibold text-white">Geotag Metadata Embedded</p>
            <p className="text-[11px] font-mono text-slate-400">
              GPS: 13.0827°N, 80.2707°E • Time: {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="btn-ghost px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSimulatePhotoUpload}
              className="btn-accent px-5 py-2 rounded-xl font-semibold"
            >
              Confirm & Save Evidence
            </button>
          </div>
        </div>
      </Modal>

      {/* CUSTOMER DIGITAL SIGNATURE MODAL */}
      <Modal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        title="Customer Sign-off & Commissioning Certificate"
        maxWidth="lg"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-500">
            I confirm that the rooftop solar photovoltaic system has been installed, commissioned, tested for generation, and handover completed to my satisfaction.
          </p>

          <div>
            <label className="label">Signer Full Name *</label>
            <input
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="label mb-0">Draw Digital Signature On Glass *</label>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-xs text-rose-500 hover:underline font-semibold"
              >
                Clear
              </button>
            </div>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white overflow-hidden">
              <canvas
                ref={canvasRef}
                width={500}
                height={160}
                className="w-full h-40 touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px]">
            <span>Captures IP address, timestamp, GPS coordinate stamp, and generates printable installation completion certificate.</span>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              onClick={() => setIsSignModalOpen(false)}
              className="btn-ghost px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSignatureSubmit}
              className="btn-accent px-5 py-2 rounded-xl font-semibold"
            >
              Submit Commissioning Proof
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
