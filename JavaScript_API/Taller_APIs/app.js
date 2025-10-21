window.addEventListener('load', () => {

    const componentUsers = (name, email, city, website, company) => {
        /* Creación de Nodos */
        const cardUser = document.createElement('article');
        const nameUser = document.createElement('h2');
        const imgUser = document.createElement('i');
        const dataUser = document.createElement('div');
        const linkUser = document.createElement('strong');
        const emailUser = document.createElement('a');
        const location = document.createElement('p');
        const webSite = document.createElement('a');
        const corporation = document.createElement('p');

        /* Asignando Clases */
        cardUser.setAttribute('class', 'tarjeta_usuario');
        nameUser.setAttribute('class', 'usuario_nombre');
        imgUser.setAttribute('class', 'fa-solid fa-user icono_usuario');
        dataUser.setAttribute('class', 'usuario_datos');
        linkUser.setAttribute('class', 'dato_link');
        emailUser.setAttribute('class', 'link_email');
        location.setAttribute('class', 'dato_ciudad');
        webSite.setAttribute('class', 'dato_webSite');
        corporation.setAttribute('class', 'dato_empresa');

        /* Configurar enlaces */
        emailUser.setAttribute('href', `mailto:${email}`);
        webSite.setAttribute('href', website.startsWith('http') ? website : `https://${website}`);
        webSite.setAttribute('target', '_blank');

        /* Asignar contenido */
        nameUser.textContent = name.toUpperCase();

        // Aquí insertamos los iconos como texto (pueden ser emojis o iconos HTML)
        emailUser.innerHTML = `📧 ${email.toLowerCase()}`;
        location.innerHTML = `📍 ${city}`;
        webSite.innerHTML = `🌐 ${website}`;
        corporation.innerHTML = `🏢 ${company.name}`;

        /* Armar estructura */
        cardUser.appendChild(imgUser);
        cardUser.appendChild(nameUser);
        cardUser.appendChild(dataUser);

        dataUser.appendChild(linkUser);
        linkUser.appendChild(emailUser);

        dataUser.appendChild(location);
        dataUser.appendChild(webSite);
        dataUser.appendChild(corporation);

        const container = document.getElementById('users');
        container.appendChild(cardUser);
    };

    const url = `https://jsonplaceholder.typicode.com/users`;

    async function obtenerDatosUsers() {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Usuarios no encontrados.`);
                }
                throw new Error(`Error de red: ${response.status}`);
            }

            const data = await response.json();

            data.forEach(user => {
                componentUsers(
                    user.name,
                    user.email,
                    user.address.city,
                    user.website,
                    user.company
                );
            });

        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    obtenerDatosUsers();

});