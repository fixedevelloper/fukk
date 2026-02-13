import './auth.css'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (

     <div>
         <main className="main">{children}</main>
      </div>
  )
}
