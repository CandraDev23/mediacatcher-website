const photos = document.querySelectorAll('.photo');
const container = document.getElementById('testimony-container');

const testimonyMessage = document.getElementById('testimony-message');
const testimonyName = document.getElementById('testimony-name');
const testimonyRole = document.getElementById('testimony-role');

// Fungsi ambil posisi
function getRect(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();
  return {
    top: rect.top - parentRect.top,
    left: rect.left - parentRect.left
  };
}

function swapWithActive(clickedEl) {
  const activeEl = document.querySelector('.photo.active');

  const rectActive = getRect(activeEl);
  const rectClicked = getRect(clickedEl);

  // Transisi posisi
  activeEl.style.transition = 'none';
  clickedEl.style.transition = 'none';

  activeEl.style.transform = `translate(${rectClicked.left - rectActive.left}px, ${rectClicked.top - rectActive.top}px)`;
  clickedEl.style.transform = `translate(${rectActive.left - rectClicked.left}px, ${rectActive.top - rectClicked.top}px)`;

  activeEl.offsetHeight; clickedEl.offsetHeight;

  activeEl.style.transition = 'transform 0.7s ease';
  clickedEl.style.transition = 'transform 0.7s ease';

  activeEl.style.transform = '';
  clickedEl.style.transform = '';

  // Setelah animasi selesai
  setTimeout(() => {
    // Swap gambar
    const imgActive = activeEl.querySelector('img');
    const imgClicked = clickedEl.querySelector('img');
    const tempSrc = imgActive.src;
    imgActive.src = imgClicked.src;
    imgClicked.src = tempSrc;

    // Swap data-text
    const name = clickedEl.dataset.name;
    const role = clickedEl.dataset.role;
    const message = clickedEl.dataset.message;

    const oldName = activeEl.dataset.name;
    const oldRole = activeEl.dataset.role;
    const oldMessage = activeEl.dataset.message;

    activeEl.dataset.name = name;
    activeEl.dataset.role = role;
    activeEl.dataset.message = message;

    clickedEl.dataset.name = oldName;
    clickedEl.dataset.role = oldRole;
    clickedEl.dataset.message = oldMessage;

    // Update text
    testimonyMessage.textContent = message;
    testimonyName.textContent = name;
    testimonyRole.textContent = role;

    // Reset transition
    activeEl.style.transition = '';
    clickedEl.style.transition = '';
  }, 700);
}

// Hanya klik foto non-active
photos.forEach(photo => {
  photo.addEventListener('click', () => {
    if (!photo.classList.contains('active')) {
      swapWithActive(photo);
    }
  });
});

// form email subc
const form = document.getElementById('emailSubscribeForm');
const inputForm = document.getElementById('emailSubscribeInput');
const btn = document.querySelector('.btn-send-email-subscribe');
const svg = btn.querySelector('svg');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // cegah reload & data di URL

  if (form.checkValidity()) {
    svg.classList.add('translate-x-10');
    // lanjut kirim fetch(), axios(), dll
  } else {
    form.reportValidity(); // tampilkan pesan error browser
  }
  setTimeout(() => {
    svg.classList.remove('translate-x-10');
inputForm.value = ''; // kosongkan input
  }, 1500);
});


// navbar mobile


const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileBackdrop = document.getElementById('mobile-backdrop');
        
        function toggleMobileMenu() {
            const isOpen = mobileMenu.classList.contains('translate-x-0');
            
            if (!isOpen) {
                // Open menu
                mobileMenu.classList.remove('-translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
                mobileBackdrop.classList.add('opacity-100', 'pointer-events-auto');
                document.body.classList.add('overflow-hidden');
                
                // Animate hamburger
                const spans = mobileMenuButton.querySelectorAll('span');
                spans[0].classList.add('rotate-45', 'translate-y-2');
                spans[1].classList.add('opacity-0');
                spans[2].classList.add('-rotate-45', '-translate-y-2');
            } else {
                // Close menu
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
                mobileBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
                document.body.classList.remove('overflow-hidden');
                
                // Reset hamburger
                const spans = mobileMenuButton.querySelectorAll('span');
                spans[0].classList.remove('rotate-45', 'translate-y-2');
                spans[1].classList.remove('opacity-0');
                spans[2].classList.remove('-rotate-45', '-translate-y-2');
            }
        }
        
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
        mobileBackdrop.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('translate-x-0')) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('translate-x-0')) {
                toggleMobileMenu();
            }
        });