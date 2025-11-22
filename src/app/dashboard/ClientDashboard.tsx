import { ClientProjectsList } from '../../features/projects/components/ClientProjectsList';

export function ClientDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <ClientProjectsList />
      </div>
    </div>
  );
}
