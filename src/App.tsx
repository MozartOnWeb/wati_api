import axios from "axios";

import "./App.css";

function App() {
  const ACCESS_TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmNDU3ZmIyZi0wMGI4LTQ4MGQtOTFmZS04ZDZiMjczMTY2MDIiLCJ1bmlxdWVfbmFtZSI6Im1hbmRqb3VkYW1hQGdtYWlsLmNvbSIsIm5hbWVpZCI6Im1hbmRqb3VkYW1hQGdtYWlsLmNvbSIsImVtYWlsIjoibWFuZGpvdWRhbWFAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDcvMTcvMjAyMyAxMzozMjo0NSIsImRiX25hbWUiOiJ3YXRpX2FwcF90cmlhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNjkwMjQzMjAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.r8I0smfsSOipa3t26hsQbheFfJlZIbp18RzUkFSxxeo";

  const handleSend = () => {
    const options = {
      method: "POST",
      url: "https://app-server.wati.io/api/v1/sendTemplateMessage",
      params: { whatsappNumber: "+22361344035" },
      headers: {
        "content-type": "text/json",
        Authorization: ACCESS_TOKEN,
      },
      data: {
        broadcast_name: "test_broadcast",
        template_name: "children_toys",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <button onClick={handleSend}>Send</button>
    </>
  );
}

export default App;
