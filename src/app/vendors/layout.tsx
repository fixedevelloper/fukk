import './admin.css'
export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (

     <div>
        <aside>Sidebar Admin</aside>
        <main className="flex-1">{children}</main>
      </div>
  )
}
