import axios from "axios";

import "./App.css";

function App() {
  const handleSend = () => {
    const options = {
      method: "POST",
      url: "https://live-server-112768.wati.io/api/v1/sendTemplateMessage",
      params: { whatsappNumber: "22361344035" },
      headers: {
        "content-type": "text/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZjk5ZTliNi02MjcyLTQ5YjYtODNmMy0xZDUzZGI3OGQxYzMiLCJ1bmlxdWVfbmFtZSI6ImRhbWEubWFuZGpvdUBrYWJha29vLmFmcmljYSIsIm5hbWVpZCI6ImRhbWEubWFuZGpvdUBrYWJha29vLmFmcmljYSIsImVtYWlsIjoiZGFtYS5tYW5kam91QGthYmFrb28uYWZyaWNhIiwiYXV0aF90aW1lIjoiMDcvMTgvMjAyMyAxODo0ODoxOCIsImRiX25hbWUiOiIxMTI3NjgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJERVZFTE9QRVIiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.ezqtX_OIjz9QYIEDHdwWCJjoF_eBHRiS7NZl8eNEs2E",
      },
      data: {
        parameters: [{ name: "name", value: "name" }],
        broadcast_name: "wati_api",
        template_name: "wati_api",
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
      <button onClick={() => handleSend()}>Send</button>
    </>
  );
}

export default App;
