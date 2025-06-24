const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                    <img src="${user.avatarUrl}" alt"Foto do perfil do usuário" />
                                    <div class="data">
                                        <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                        <p>${user.bio ?? 'Não possui bio cadastrado 😢'}</p>
                                        <p>👥 <strong>Seguidores:</strong> ${user.followers} | <strong>Seguindo:</strong> ${user.following}</p>
                                    </div>
                            </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a><p>🍴 Forks: ${repo.forks_count} | ⭐ Stars: ${repo.stargazers_count} | 👀 Watchers: ${repo.watchers_count} | 🧠 Linguagem: ${repo.language ?? 'Não definida'}</p>
            </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                    <h2>Repositórios</h2>
                                                    <ul>${repositoriesItens}</ul>
                                                </div`
        }

        if (user.events.length > 0) {
            let eventsItens = ''
            user.events.forEach(event => {
                if (event.type === 'PushEvent') {
                    event.payload.commits.forEach(commit => {
                        eventsItens += `<li>📦 <strong>${event.repo.name}</strong> - ${commit.message}</li>`
                    })
                } else if (event.type === 'CreatEvent') {
                    eventsItens += `<li>🚀 <strong>${event.repo.name}</strong> - Sem mensagem de commit</li>`
                }
            })
            this.userProfile.innerHTML += `<div class="events section">
                                                    <h2>Eventos Recentes</h2>
                                                    <ul>${eventsItens}</ul>
                                                </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }