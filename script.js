function saveData() {
    let data = {
        name: document.getElementById("name").value,
        jahr: document.getElementById("jahr").value,
        bereich: document.getElementById("bereich").value,
            von: document.getElementById("von").value,
            bis: document.getElementById("bis").value,
            table: []
        };

        document.querySelectorAll("#table tbody tr").forEach(row => {
            let rowData = [];
            row.querySelectorAll("textarea, input").forEach(input => {
                rowData.push(input.value);
            });
            data.table.push(rowData);
        });

        localStorage.setItem("ausbildungsnachweis", JSON.stringify(data));
        alert("Daten gespeichert!");
    }

    function loadData() {
        let savedData = localStorage.getItem("ausbildungsnachweis");
        if (savedData) {
            let data = JSON.parse(savedData);
            document.getElementById("name").value = data.name;
            document.getElementById("jahr").value = data.jahr;
            document.getElementById("bereich").value = data.bereich;
            document.getElementById("von").value = data.von;
            document.getElementById("bis").value = data.bis;
           // document.getElementById("zeit").value = data.zeit;

            let rows = document.querySelectorAll("#table tbody tr");
            data.table.forEach((rowData, index) => {
                let inputs = rows[index].querySelectorAll("textarea, input");
                rowData.forEach((value, i) => {
                    inputs[i].value = value;
                });
            });
        }
    }

    function exportToPDF() {
        let { jsPDF } = window.jspdf;
        let doc = new jsPDF();

        html2canvas(document.body).then(canvas => {
            let imgData = canvas.toDataURL("image/png");
            let imgWidth = 210;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;

            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            doc.save("Ausbildungsnachweis.pdf");
        });
    }

      function allesLoeschen() {
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
  }
  
    window.onload = loadData;

 window.onload = function() {
  function berechneGesamt() {
    let summe = 0;
    document.querySelectorAll(".stunden").forEach(input => {
      let wert = parseFloat(input.value);
      if (wert < 0) wert = 0;
      summe += wert || 0;
    });
    document.getElementById("zeit").value = summe.toFixed(2);
  }

  document.querySelectorAll(".stunden").forEach(input => {
    input.addEventListener("input", berechneGesamt);
  });
};
 