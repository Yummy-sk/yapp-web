import { Box, Button } from 'components';
import React, { ReactElement } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import styled from 'styled-components';
import { FieldNameTypes } from '.';
import Breakpoints from 'constants/breakpoints';
import media from 'styles/media';
import getRecruitLink from 'utils/getRecruitLink';

interface RecruitFieldExplainProps {
  fieldName: FieldNameTypes;
  explainContents: {
    content1: string;
    content2: string;
    content3: string;
  };
}

function RecruitFieldExplain({
  fieldName,
  explainContents,
}: RecruitFieldExplainProps): ReactElement {
  const { content1, content2, content3 } = explainContents;
  return (
    <RecruitFieldWrapper>
      <FieldBox backgroundColor="grey_50">
        <FieldBoxInner>
          <SubTitleStyled>
            다음과 같은
            <br /> 활동을 합니다 🙌
          </SubTitleStyled>
          <ContentStyled
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content1) }}
          />
        </FieldBoxInner>
      </FieldBox>

      <FieldBox backgroundColor="grey_50">
        <FieldBoxInner>
          <SubTitleStyled>
            이런 {fieldName}를<br /> 찾습니다 🔎
          </SubTitleStyled>
          <ContentStyled
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content2) }}
          />
        </FieldBoxInner>
      </FieldBox>

      <FieldBox backgroundColor="grey_50">
        <FieldBoxInner>
          <SubTitleStyled>
            이런 경험이 있으면
            <br /> 더 좋습니다 😊
          </SubTitleStyled>
          <ContentStyled
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content3) }}
          />
        </FieldBoxInner>
      </FieldBox>

      <ButtonBlock
        target="_blank"
        href={getRecruitLink(fieldName)}
        rel="noreferrer"
      >
        <ApplyButton
          width={176}
          height={65}
          fontColor="white"
          buttonColor="grey_850"
          borderColor="lightGrey"
        >
          {fieldName} 지원하기
        </ApplyButton>
      </ButtonBlock>
    </RecruitFieldWrapper>
  );
}

const RecruitFieldWrapper = styled.div`
  margin-top: 64px;
  ${media.tablet} {
    padding: 0 22px;
  }
  ${media.mobile} {
    padding: 0 20px;
    margin-top: 32px;
  }
`;

const FieldBox = styled(Box)`
  padding: 0;
  width: ${Breakpoints.large}px;
  margin-bottom: 32px;
  &:nth-child(3) {
    margin-bottom: 64px;
  }
  ${media.tablet} {
    width: 100%;
  }
`;

const FieldBoxInner = styled.div`
  padding: 32px;
  display: flex;
  ${media.mobile} {
    flex-direction: column;
    padding: 24px;
  }
`;

const SubTitleStyled = styled.span`
  ${({ theme }) => theme.textStyle.web.Subtitle}
  color: ${({ theme }) => theme.palette.grey_1000};
  width: 371px;
  br {
    display: none;
  }

  ${media.tablet} {
    width: 271px;
    br {
      display: block;
    }
  }
  ${media.mobile} {
    margin-bottom: 8px;
    ${({ theme }) => theme.textStyle.mobile.Subtitle}
  }
`;

const ContentStyled = styled.span`
  ${({ theme }) => theme.textStyle.web.Body_1}
  color: ${({ theme }) => theme.palette.grey_850};
  ${media.mobile} {
    ${({ theme }) => theme.textStyle.mobile.Body_1}
  }
`;

const ButtonBlock = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ApplyButton = styled(Button)`
  transition: all 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey_700};
  }
  ${media.mobile} {
    width: 162px;
    height: 56px;
  }
`;

export default RecruitFieldExplain;
