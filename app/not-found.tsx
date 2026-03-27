export default function NotFound() {
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
        Page not found
      </div>
      <div style={{ fontSize: 14, opacity: 0.4 }}>
        This tracking page does not exist or the link has expired.
      </div>
    </div>
  )
}
