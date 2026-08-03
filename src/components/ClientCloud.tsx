import { privateClients, publicClients } from "@/data/clients";

export function ClientCloud() {
  return (
    <div className="client-groups">
      <div className="client-group">
        <span className="client-group__label">PUBLIC</span>
        <div className="client-cloud">
          {publicClients.map((client) => <span key={client}>{client}</span>)}
        </div>
      </div>
      <div className="client-group">
        <span className="client-group__label">CORPORATE</span>
        <div className="client-cloud">
          {privateClients.map((client) => <span key={client}>{client}</span>)}
        </div>
      </div>
    </div>
  );
}
