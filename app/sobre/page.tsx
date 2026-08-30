export const metadata = {
  title: "Sobre — Observatório do Exame de Suficiência",
};

export default function Sobre() {
  return (
    <div className="max-w-none space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Sobre o Observatório</h1>
        <p className="mt-3 text-slate-700">
          O Observatório do Exame de Suficiência é dedicado à divulgação
          sistematizada de dados dos Exames de Suficiência do Conselho
          Federal de Contabilidade, com o intuito de integrar os dados
          estatísticos, identificar padrões de desempenho, áreas de
          dificuldade e subsidiar a proposição de intervenções pedagógicas
          que melhorem a preparação dos estudantes, contribuindo para uma
          formação contábil de excelência e alinhada às exigências do
          mercado e das normativas profissionais.
        </p>
        <p className="mt-3 text-slate-700">
          Desenvolvido por Leonardo dos Santos Bandeira e Maísa da Silva
          Primo, o Observatório é financiado pela Universidade Estadual do
          Tocantins (UNITINS) por meio do Programa Institucional de Bolsas
          de Iniciação à Extensão (Pibiex) e vinculado ao curso de Ciências
          Contábeis do câmpus de Paraíso do Tocantins.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Dados</h2>
        <p className="mt-2 text-slate-700">
          Os dados aqui sistematizados foram recuperados no website do
          Conselho Federal de Contabilidade (CFC) e a base integrada, bem
          como os relatórios originais, podem ser consultados{" "}
          <a
            href="https://drive.google.com/drive/folders/13ndGynhdroZspwxnB2dJ6Eb6Q5OhIdG1?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            aqui
          </a>
          .
        </p>
        <p className="mt-2 text-slate-700">
          Notas sobre os dados estão disponíveis em{" "}
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vSlhi4KJF3TN3RQurqNlbl9PGVT39mRT29CXyd-dimRoIGcCV6eK5Xl40MlutLF4NrkkfO5gZkyCgD_/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Leia-me
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Contribuições</h2>
        <p className="mt-2 text-slate-700">
          Se você encontrou alguma inconsistência ou deseja contribuir com
          sugestões de melhoria, entre em contato conosco em:{" "}
          <a href="mailto:leonardo.ds@unitins.br" className="text-blue-600 underline">
            leonardo.ds@unitins.br
          </a>
          .
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Referências</h2>
        <p className="mt-2 text-slate-700">
          Informe a seguinte referência ao utilizar os dados estatísticos
          integrados do Exame de Suficiência resgatados neste Observatório:
        </p>
        <div className="mt-3 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div>
            <p className="font-semibold text-slate-900">ABNT</p>
            <p className="mt-1">
              BANDEIRA, Leonardo dos Santos; PRIMO, Maísa da Silva. Dados
              estatísticos integrados do Exame de Suficiência do Conselho
              Federal de Contabilidade - Observatório do Exame de
              Suficiência. Universidade Estadual do Tocantins (UNITINS).
              Disponível em:{" "}
              <a
                href="https://observatoriosuficiencia.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://observatoriosuficiencia.com.br/
              </a>
              . Acesso em: mês/ano.
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">APA</p>
            <p className="mt-1">
              Bandeira, L. S. &amp; Primo, M. S. Dados estatísticos
              integrados do Exame de Suficiência do Conselho Federal de
              Contabilidade - Observatório do Exame de Suficiência.
              Universidade Estadual do Tocantins (UNITINS). Recuperado de{" "}
              <a
                href="https://observatoriosuficiencia.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                https://observatoriosuficiencia.com.br/
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
