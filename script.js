document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("likeBtn");
    const likeIcon = document.getElementById("likeIcon");
    const likesCountSpan = document.getElementById("likesCount");
    const likesTextCount = document.getElementById("likesTextCount");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.getElementById("bookmarkBtn");

    let baseLikes = 67mil;
    let isLiked = false;

    // Formatação de números (ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza a interface das curtidas
    function updateLikesDisplay() {
        const formatted = formatLikes(baseLikes);
        likesCountSpan.textContent = formatted;
        likesTextCount.textContent = `${baseLikes} others`;
    }

    // Animação do ícone
    function triggerAnimation(element) {
        element.style.transform = "scale(1.4)";
        setTimeout(() => {
            element.style.transform = "scale(1)";
        }, 150);
    }

    // Função de curtir/descurtir
    function toggleLike() {
        isLiked = !isLiked;

        if (isLiked) {
            baseLikes++;
            likeIcon.style.fill = "#ef4444";
            likeIcon.style.stroke = "#ef4444";
            likeBtn.classList.add("liked");
        } else {
            baseLikes = Math.max(0, baseLikes - 1);
            likeIcon.style.fill = "none";
            likeIcon.style.stroke = "currentColor";
            likeBtn.classList.remove("liked");
        }

        updateLikesDisplay();
        triggerAnimation(likeIcon);
    }

    // Evento de clique no Botão de Curtir
    if (likeBtn) {
        likeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleLike();
        });
    }

    // Evento de clique na Imagem Principal (Soma curtida)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isLiked) {
                toggleLike();
            } else {
                triggerAnimation(likeIcon);
            }
        });
    }

    // Evento no botão de Salvar (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

            const bookmarkSvg = bookmarkBtn.querySelector("svg");
            if (bookmarkSvg) {
                triggerAnimation(bookmarkSvg);
            }
        });
    }

    // Inicializa o contador zerado
    updateLikesDisplay();
});