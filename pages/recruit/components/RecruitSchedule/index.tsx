import { Box } from 'components';
import Breakpoints from 'constants/breakpoints';
import { RECRUIT_SCHEDULE } from 'database/recruit';
import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import media from 'styles/media';
import { SectionTemplate, SectionTitle } from '..';

function RecruitSchedule(): ReactElement {
  const { title, schedules } = RECRUIT_SCHEDULE;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current!.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.DragEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  return (
    <SectionTemplate>
      <SectionTitle title={title} />
      <SectionContent
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        ref={scrollRef}
      >
        {schedules.map(({ subTitle, description }) => (
          <ScheduleBox
            width={278}
            height={188}
            backgroundColor="grey_50"
            key={`schedule-${subTitle}`}
          >
            <ScheduleBoxInner>
              <ScheduleSubTitle>{subTitle}</ScheduleSubTitle>
              <ScheduleContent
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </ScheduleBoxInner>
          </ScheduleBox>
        ))}
      </SectionContent>
    </SectionTemplate>
  );
}

const SectionContent = styled.div`
  display: flex;
  width: ${Breakpoints.large}px;
  justify-content: space-between;
  ${media.tablet} {
    width: auto;
    overflow: auto;
    margin-left: 22px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ScheduleBox = styled(Box)`
  padding: 0;
  white-space: nowrap;
  ${media.tablet} {
    margin-right: 30px;
  }
  ${media.mobile} {
    width: 225px;
    height: 172px;
  }
`;

const ScheduleBoxInner = styled.div`
  padding: 32px;
`;

const ScheduleSubTitle = styled.div`
  ${({ theme }) => theme.textStyle.web.Subtitle}
  margin-bottom: 4px;
  ${media.mobile} {
    ${({ theme }) => theme.textStyle.mobile.Subtitle}
  }
`;

const ScheduleContent = styled.div`
  ${({ theme }) => theme.textStyle.web.Body_1};
  .smallBox {
    margin-top: 16px;
    margin-bottom: 12px;
  }
  ${media.mobile} {
    ${({ theme }) => theme.textStyle.mobile.Body_1};
  }
`;

export default RecruitSchedule;
