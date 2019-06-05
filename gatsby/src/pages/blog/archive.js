import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import { Layout, Wrapper, Header, SectionTitle, MXContentMain } from '../../components'
import config from '../../../config'

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 3rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
`

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`

const Category = ({
  data: {
    allMdx: { edges },
  },
}) => (
  <Layout navmode="blog">
      <Helmet title={`Blog Archive ${config.siteTitle}`} />
      <MXContentMain>
        <h1>Blog Archive</h1>
        {edges.map(edge => (
          <p><a href={edge.node.fields.slug}>{edge.node.frontmatter.title}</a></p>
          
        ))}
      </MXContentMain>
  </Layout>
)

export default Category

Category.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query ArchivePage {
    allMdx(sort: { fields: [frontmatter___date, fileAbsolutePath], order: DESC },
      filter: {frontmatter: {date: {ne: null}}}) {
      totalCount
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`