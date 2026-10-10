import EnquiryForm from '@/components/EnquiryForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-sm">
              3S
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Demo 3S Real Estate Lahore
            </span>
          </div>
          <a
            href="tel:+923000000000"
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-700 sm:inline-block"
          >
            Call: +92 300 0000000
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Hero Section */}
          <section className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Trusted Lahore Property Advisors
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Find your plot or home in Lahore
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Whether you are looking to invest in prime commercial real estate or searching for your dream residence across DHA, Bahria Town, or Gulberg, our licensed consultants are ready to assist.
            </p>
            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center gap-3 text-slate-700">
                <span className="inline-flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900">3 branches across Lahore</span>
                <span className="text-slate-400">•</span>
                <span className="text-sm text-slate-600">DHA, Gulberg &amp; Bahria Town</span>
              </div>
            </div>
          </section>

          {/* Form Card */}
          <section className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Get a free consultation</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Fill out the form below and one of our dedicated property consultants will contact you.
                </p>
              </div>
              <EnquiryForm />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 sm:px-6">
          &copy; 2025 Demo 3S Real Estate Lahore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
