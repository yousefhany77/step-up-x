import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{
        display: 'grid',
        alignItems: 'center',
        gap: '20px',
        justifyContent: 'center',
        minHeight: '50vh',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {children}
    </section>
  )
}

export default layout
