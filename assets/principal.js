document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add('darkmode');
  }
});

const btnToggle = document.getElementById('darkmode');
btnToggle.addEventListener('click', () => {
  document.body.classList.toggle('darkmode');
  localStorage.setItem('darkmode', document.body.classList.contains('darkmode'));
});

const modal      = document.getElementById('mobile-modal');
const modalOk    = document.getElementById('modal-ok');
const baixarBtn  = document.getElementById('baixar-cv');

baixarBtn.addEventListener('click', event => {
  if (window.innerWidth <= 600) {
    event.preventDefault();
    modal.style.display = 'flex';
    return;   
  }

  const element = document.getElementById("curriculo");
  const opt = {
    margin:   0.5,
    filename: "Curriculo_Luis_Felipe_de_Pieri.pdf",
    image:    { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      onclone: clonedDoc => clonedDoc.body.classList.remove("darkmode")
    },
    jsPDF:    { unit: "in", format: "a4", orientation: "portrait" },
    pagebreak:{ mode:["css","legacy"], avoid:["section","h3"] }
   };

  html2pdf().set(opt).from(element).output('blob')
    .then(pdfBlob => {
      const blobUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = opt.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    })
    .catch(err => console.error('Erro ao gerar PDF:', err));
});

  modalOk.addEventListener('click', () => {
  modal.style.display = 'none';
});

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const secoes = [
    { id: "inicio", texto: "Início"},
    { id: "rp", texto: "Resumo" },
    { id: "ep", texto: "Experiência" },
    { id: "ht", texto: "Habilidades" },
    { id: "fa", texto: "Formação" },
    { id: "cc", texto: "Cursos" },
    { id: "idi", texto: "Idiomas" }
  ];

  const nav = document.getElementById("menu-fixo");

  secoes.forEach(secao => {
    const link = document.createElement("a");
    link.href = `#${secao.id}`;
    link.textContent = secao.texto;
    link.setAttribute("aria-label", `Ir para a seção ${secao.texto}`);
    link.title = `Ir para ${secao.texto}`;
    nav.appendChild(link);
  });
});