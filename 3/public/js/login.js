

const login = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: "/show/login",
            data: {
                email,
                password,
            }
        });
        console.log(res,);
        window.location.href = "/viewshows";
    } catch (error) {
        console.log(error.message);
    }
};

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
});