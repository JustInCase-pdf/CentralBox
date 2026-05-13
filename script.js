function changeMessage() {
  document.getElementById("message").innerText = "You clicked the button! 🎉";
}

function saveContactInfo() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  const blob = new Blob([data], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "contact-info.txt";
  link.click();
}
