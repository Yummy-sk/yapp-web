import { useState } from 'react';
import { GetStaticProps } from 'next';
import styled from 'styled-components';
import { TabMenu, ProjectCard, Button } from 'components/common';
import { getAllProjects } from 'utils/getAllProjects';
import { PROJECT_CATEGORIES } from 'database/project';
import media from 'styles/media';
import { Project as ProjectType } from 'types/project';

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getAllProjects();

  const projectData = projects.map(({ project, slug }: any) => {
    return {
      title: project.name,
      thumbnail: project.thumbnail,
      tags: project.tags,
      category: project.field,
      generation: project.generation,
      url: slug.join('/'),
    };
  });

  if (projectData) {
    return {
      props: {
        projects: projectData,
      },
    };
  }

  return {
    notFound: true,
  };
};

export type ProjectCategoryTypes = 'iOS' | 'Android' | 'Web' | 'ML';

interface ProjectProps {
  projects: ProjectType[];
}

// Project Grid View
function Project({ projects }: ProjectProps) {
  const [category, setCategory] = useState<ProjectCategoryTypes>(
    PROJECT_CATEGORIES[0],
  );

  return (
    <ProjectWrapper>
      <ProjectContainer>
        <ProjectTitleWrapper>
          기획부터 런칭까지,
          <br /> 다양한 프로젝트를 경험해 보세요!
        </ProjectTitleWrapper>
        <CategoriesWrapper>
          <TabMenu
            tabs={PROJECT_CATEGORIES}
            currentTab={category}
            onClick={setCategory}
            backgroundColor="white"
          />
        </CategoriesWrapper>
        <ProjectGridWrapper>
          {projects
            .filter((project: any) => project.category.includes(category))
            .map((project: any) => (
              <ProjectCard key={project.title} project={project} />
            ))}
        </ProjectGridWrapper>
        <ButtonWrapper>
          <StyledButton
            width={148}
            height={65}
            fontColor="white"
            buttonColor="grey_850"
          >
            더보기
          </StyledButton>
        </ButtonWrapper>
      </ProjectContainer>
    </ProjectWrapper>
  );
}

const ProjectWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.grey_100};
  padding: 174px 0;

  ${media.mobile} {
    padding: 80px 0;
  }
`;

const ProjectContainer = styled.section`
  position: relative;
  flex: 0 1 1200px;
  margin: 0 10px;
`;

const ProjectTitleWrapper = styled.div`
  margin-bottom: 140px;
  ${({ theme }) => theme.textStyle.web.Title};
  ${media.mobile} {
    margin-bottom: 80px;
    ${({ theme }) => theme.textStyle.mobile.Title_2};
  }
`;

const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ProjectGridWrapper = styled.div`
  display: grid;
  row-gap: 30px;
  column-gap: 30px;
  margin-top: 64px;

  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 56px;
`;

const StyledButton = styled(Button)`
  transition: background-color 0.5s;
  &:hover {
    background-color: ${({ theme }) => theme.palette.grey_700};
  }

  ${media.mobile} {
    width: 162px;
    height: 56px;
  }
`;

export default Project;
