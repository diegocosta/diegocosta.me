import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { UseComboboxReturnValue } from 'downshift';
import Fuse from 'fuse.js';

import { SearchArticlesQuery } from '~/../graphql-types';

const Container = styled.div`
  position: relative;
  margin: 40px 0;
`;

const Input = styled.input`
  transition: background 0.4s, box-shadow 0.2s;
  width: 100%;
  padding: 20px;
  background: #0e0f11;
  outline: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  line-height: 18px;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #1b1b1d;

  :focus {
    background-color: #1b1b1d;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    color: #fff;
  }

  ::placeholder {
    color: white;
  }

  :focus::placeholder {
    color: white;
  }
`;

const Results = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(20px + 21px + 18px);
  align-items: center;
  cursor: text;
  background: #1b1b1d;
  color: black;
  z-index: 4;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.1);
`;

const ResultLink = styled(Link)<{ highlighted: boolean }>`
  display: block;
  text-decoration: none;
  padding: 20px;

  :hover {
    text-decoration: none;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ResultItemTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  margin: 0 0 5px;
  font-weight: 400;
`;

const ResultItemDescription = styled.p`
  color: #9a9a9a;
  font-size: 14px;
  margin: 0%;
`;

export type ArticleProps = SearchArticlesQuery['articles']['nodes'][0];

interface SearchProps {
  combobox: UseComboboxReturnValue<Fuse.FuseResult<ArticleProps>>;
  articles: Fuse.FuseResult<ArticleProps>[];
}

export default function Search({ articles, combobox }: SearchProps): React.ReactElement {
  return (
    <Container {...combobox.getComboboxProps()}>
      <Input type="text" placeholder="Busque por publicações..." autoComplete="off" {...combobox.getInputProps()} />
      <Results {...combobox.getMenuProps()} data-testid="search-results">
        {combobox.isOpen &&
          articles &&
          articles.map((article, index: number) => (
            <ResultLink
              key={article.item.id}
              data-testid="search-results-link"
              to={article.item.fields?.slug ?? ''}
              {...combobox.getItemProps({ index, item: article })}>
              <ResultItemTitle data-testid="search-results-title">
                {article.item.frontmatter?.title ?? ''}
              </ResultItemTitle>
              <ResultItemDescription data-testid="search-results-description">
                {article.item.frontmatter?.description ?? ''}
              </ResultItemDescription>
            </ResultLink>
          ))}
      </Results>
    </Container>
  );
}