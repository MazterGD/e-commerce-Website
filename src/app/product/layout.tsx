export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav>
            <h3>This is the header</h3>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Promotions</li>
                <li>About</li>
                <li>Settings</li>
            </ul>
        </nav>
   
        {children}
      </section>
    )
  }