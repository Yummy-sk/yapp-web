import { Box, Button } from 'components';
import { RECRUIT_FIELD_NAMES } from 'database/recruit';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { SectionTemplate, SectionTitle } from '..';
import RecruitDesigner from './RecruitDesigner';
import RecruitDeveloper from './RecruitDeveloper';
import RecruitProjectManager from './RecruitProjectManager';

export type FieldNameTypes = '기획자' | '디자이너' | '개발자';

function RecruitField(): ReactElement {
  const [field, setField] = useState<FieldNameTypes>(RECRUIT_FIELD_NAMES[0]);

  const handleClick = (fieldName: FieldNameTypes) => setField(fieldName);

  const printField = () => {
    switch (field) {
      case '기획자':
        return <RecruitProjectManager />;
      case '디자이너':
        return <RecruitDesigner />;
      case '개발자':
        return <RecruitDeveloper />;
      default:
        return null;
    }
  };

  return (
    <SectionTemplate>
      <SectionTitle title="모집 분야" />
      <RecruitFieldNameBox
        width={696}
        height={78}
        backgroundColor="lightestGray"
        borderRadius={124}
      >
        {RECRUIT_FIELD_NAMES.map((name) => (
          <Button
            key={`field-${name}`}
            width={229}
            height={78}
            onClick={() => handleClick(name)}
            fontColor="white"
            buttonColor="black"
            borderColor="white"
          >
            {name}
          </Button>
        ))}
        {printField()}
      </RecruitFieldNameBox>
    </SectionTemplate>
  );
}

const RecruitFieldNameBox = styled(Box)`
  margin: 0 auto;
  padding: 0;
`;

export default RecruitField;
