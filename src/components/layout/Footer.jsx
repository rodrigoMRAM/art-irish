import React from 'react'

export const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top futer">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
      </a>
      <a className="mb-3 mb-md-0 text-light nav-link dark-mode">© 2025 | Estudio Irish |</a>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="mx-5 text-white nav-link dark-mode">Visitanos en <a className="text-warning" href="https://www.estudioirish.net/" target="_blank">www.estudioirish.net</a></li>
  
    </ul>
  </footer>
  )
}


