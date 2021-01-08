(async () => {
  const logins = document.getElementById("logins");
  const spinner = document.getElementById("spinner");
  const loggedIn = document.getElementById("loggedIn");

  const isUserThere = async () => {
    const res = await fetch("/.auth/me");
    const { clientPrincipal } = await res.json();

    return clientPrincipal !== null;
  };

  const getMessage = async () => {
    const res = await fetch("/api/hello");
    const msg = await res.text();

    loggedIn.querySelector(".message").innerHTML = msg;
  };

  if (!(await isUserThere())) {
    spinner.classList.toggle("hidden");
    logins.classList.toggle("hidden");
  } else {
    await getMessage();
    spinner.classList.toggle("hidden");
    loggedIn.classList.toggle("hidden");
  }
})();
