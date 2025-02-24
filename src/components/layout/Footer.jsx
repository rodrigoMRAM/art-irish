import React from 'react'

export const Footer = () => {
  return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top futer">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      </a>
      <a class="mb-3 mb-md-0 text-light nav-link dark-mode">© 2025 | Estudio Irish |</a>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="mx-5 text-white nav-link dark-mode">Visitanos en <a class="text-warning" href="https://www.estudioirish.net/" target="_blank">www.estudioirish.net</a></li>
  
    </ul>
  </footer>
  )
}


