document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("likeBtn");
    const likeIcon = document.getElementById("likeIcon");
    const likesCountSpan = document.getElementById("likesCount");
    const likesTextCount = document.getElementById("likesTextCount");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.getElementById("bookmarkBtn");
    
    // Elementos de Comentários e Republicação
    const commentInput = document.getElementById("commentInput");
    const postCommentBtn = document.getElementById("postCommentBtn");
    const commentsSection = document.getElementById("commentsSection");
    
    // O 3º botão na barra de ações (Republicar/Compartilhar)
    const repostBtn = document.querySelectorAll(".left-actions .action-btn")[2];

    let baseLikes = 67000;
    let isLiked = false;
    let repostCount = 24;
    let isReposted = false;

    // Formatação de números (ex: 67000 -> 67.0K)
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

    // Funcionalidade: Comentar
    function addComment() {
        const text = commentInput.value.trim();
        if (text === "") return;

        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-item");
        commentDiv.innerHTML = `<strong>voce_usuario</strong> ${text}`;
        
        commentsSection.appendChild(commentDiv);
        commentInput.value = "";
        commentsSection.scrollTop = commentsSection.scrollHeight;
    }

    if (postCommentBtn) {
        postCommentBtn.addEventListener("click", addComment);
    }

    if (commentInput) {
        commentInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                addComment();
            }
        });
    }

    // Funcionalidade: Republicar (Compartilhar)
    if (repostBtn) {
        repostBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isReposted = !isReposted;
            
            if (isReposted) {
                repostCount++;
                repostBtn.classList.add("reposted");
            } else {
                repostCount = Math.max(0, repostCount - 1);
                repostBtn.classList.remove("reposted");
            }

            const svgContent = repostBtn.querySelector("svg").outerHTML;
            repostBtn.innerHTML = svgContent + " " + repostCount;

            const repostSvg = repostBtn.querySelector("svg");
            if (repostSvg) {
                triggerAnimation(repostSvg);
            }
        });
    }

    // Inicializa o contador de curtidas
    updateLikesDisplay();
});