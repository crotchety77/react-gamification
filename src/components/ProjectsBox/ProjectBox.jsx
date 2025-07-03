import ProjectCardOutside from "./ProjectCardsOutside/ProjectCardOutside.jsx";

export default function ProjectBox({ projects }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
        <h1 className="text-black">Тут будут проектики</h1>
      {projects.map(project => (
        <ProjectCardOutside key={project.id} project={project} />
      ))}
    </div>
  );
}