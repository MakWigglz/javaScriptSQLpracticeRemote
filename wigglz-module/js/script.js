function Video({ video }) {
	return (
	  <div>
		<Thumbnail video={video} />
		<a href={video.url}>
		  <h3>{video.title}</h3>
		  <p>{video.description}</p>
		</a>
		<LikeButton video={video} />
	  </div>
	);
  }  window.onscroll = () => {
	const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (winScroll / height) * 100;
	document.querySelector("#progressBar").style.width = scrolled + "%";
  };
  const searchInput = document.querySelector('#search');
  searchInput.addEventListener('input', (e) => {
	const searchTerm = e.target.value.toLowerCase();
	const items = document.querySelectorAll('.searchable-item');
	items.forEach(item => {
	  item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
	});
  });
  
 
		window.addEventListener('scroll', () => {
			if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
				loadMoreContent();
			}
		}); 
		const draggables = document.querySelectorAll('.draggable');
		draggables.forEach(draggable => {
		  draggable.addEventListener('dragstart', () => {
			draggable.classList.add('dragging');
		  });
		});
		const themeToggle = document.createElement('button');
		themeToggle.onclick = () => {
		  document.body.classList.toggle('dark-mode');
		  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
		};
// Add smooth hover effects on elements
const element = document.querySelector('.hover-me');
element.addEventListener('mouseover', () => {
  gsap.to(element, {duration: 0.3, scale: 1.1, ease: "power1.out"});
});
				