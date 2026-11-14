import './c9.css';

/*
  Grupo de rotas do site institucional de 2026-11 (home + páginas de
  serviço). O wrapper isola os tokens e as regras do redesign (`c9.css`)
  das páginas antigas, que seguem com o céu por hora de `globals.css`.
*/
export default function C9Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="c9" data-theme="c9">
      {children}
    </div>
  );
}
