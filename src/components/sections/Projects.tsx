import React from 'react';
import { ProjectCard, Section } from '../shared';
import { projectsData } from '../../data/portfolioData';

interface ProjectsProps {
  onOpenModal: (title: string, description: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenModal }) => {
  return (
    <Section id="projects" subtitle="Selected Works" title="Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, i) => (
          <ProjectCard 
            key={i}
            {...project} 
            onDetails={() => onOpenModal(project.title, project.details)} 
          />
        ))}
      </div>
    </Section>
  );
};
