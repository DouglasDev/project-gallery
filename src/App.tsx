import { styled } from '@linaria/react';
import { useEffect, useState } from 'react';

interface Project {
  repository: string;
  title: string;
  description?: string;
  url: string;
  image?: string;
}

const Gallery = styled.main`
  width: min(1120px, 100% - 48px);
  margin: auto;
  padding: clamp(36px, 10vw, 100px) 0 72px;
`;

const Heading = styled.h1`
  margin: 0 0 42px;
  padding-bottom: 24px;
  border-bottom: 1px solid #5e574e;
  font:
    400 clamp(3rem, 10vw, 8rem) / 0.91 'Instrument Serif',
    Georgia,
    serif;
  letter-spacing: -0.075em;
`;

const Works = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
  gap: clamp(28px, 5vw, 56px);
`;

const Work = styled.a`
  display: block;
  min-width: 0;
  color: inherit;
  text-decoration: none;
  &:hover {
    color: #f7e0b4;
  }
  &:focus-visible {
    outline: 2px solid #f7e0b4;
    outline-offset: 7px;
  }
`;

const Frame = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background:
    repeating-linear-gradient(120deg, #e7ddac33 0 1px, transparent 1px 22px),
    radial-gradient(ellipse at 85% 20%, #716f32, #262a25 75%);
  &[data-score='true'] {
    background:
      repeating-linear-gradient(0deg, #f8caa62e 0 1px, transparent 1px 12px),
      radial-gradient(ellipse at 20% 85%, #954a42, #3f2330 75%);
  }
`;

const Preview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 240ms ease;
  &:hover {
    transform: scale(1.03);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const WorkTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  margin: 16px 0 6px;
  font:
    400 clamp(1.75rem, 4vw, 3rem) / 1.1 'Instrument Serif',
    Georgia,
    serif;
`;

const Arrow = styled.span`
  font:
    400 1.25rem / 1 system-ui,
    sans-serif;
`;

const Description = styled.p`
  margin: 0;
  color: #d5cab9;
  line-height: 1.55;
`;

export function App() {
  const [projects, setProjects] = useState<Project[]>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Gallery unavailable');

        return response.json();
      })
      .then(setProjects)
      .catch(() => setFailed(true));
  }, []);

  return (
    <Gallery>
      <Heading>Project Gallery</Heading>
      {failed && <Description role="alert">Could not load projects.</Description>}
      <Works aria-label="Projects">
        {projects?.map((project) => (
          <Work
            key={project.repository}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Frame data-score={project.repository === 'DouglasDev/spem'}>
              {project.image && <Preview src={project.image} alt="" />}
            </Frame>
            <WorkTitle>
              {project.title}
              <Arrow aria-hidden="true">↗</Arrow>
            </WorkTitle>
            {project.description && <Description>{project.description}</Description>}
          </Work>
        ))}
      </Works>
    </Gallery>
  );
}
