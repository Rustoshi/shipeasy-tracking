export default function ReceiptNotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#040d1f', color: 'white',
      fontFamily: 'system-ui, sans-serif', textAlign: 'center',
      padding: '24px',
    }}>
      <div style={{ fontSize: 64, fontWeight: 800, opacity: 0.08, marginBottom: 8 }}>
        404
      </div>
      <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
        Receipt not found
      </div>
      <div style={{ fontSize: 14, opacity: 0.4, maxWidth: 320 }}>
        This shipment does not exist or the tracking ID is invalid.
      </div>
    </div>
  )
}
