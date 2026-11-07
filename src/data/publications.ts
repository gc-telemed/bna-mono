/**
 * What the site derives from a publication: its DOI link, the parts of its reference, and its
 * schema.org entry. The publications themselves are PUBLICATIONS in site.ts.
 */
import { LINKS, SITE, type Publication } from '@/data/site';

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

/** "Karna, R." for one author, joined with commas and an ampersand for more. */
export function authorList(publication: Publication): string {
  const names = publication.authors.map(({ family, given }) => `${family}, ${given[0]}.`);
  return names.length > 1 ? `${names.slice(0, -1).join(', ')}, & ${names.at(-1)}` : names[0];
}

/** What follows the title in the reference: the version, if any, and the resource type. */
export function referenceDetail(publication: Publication): string {
  const version = publication.version ? ` (Version ${publication.version})` : '';
  return `${version} [${publication.kind}]`;
}

function person({ family, given, orcid }: Publication['authors'][number]) {
  return {
    '@type': 'Person',
    name: `${given} ${family}`,
    givenName: given,
    familyName: family,
    ...(orcid && { identifier: `https://orcid.org/${orcid}` }),
    affiliation: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
  };
}

/** The publication as schema.org data, identified by its DOI. */
export function scholarlyData(publication: Publication) {
  const url = doiUrl(publication.doi);
  return {
    '@type': publication.kind === 'Software' ? 'SoftwareSourceCode' : 'ScholarlyArticle',
    '@id': url,
    url,
    name: publication.title,
    author: publication.authors.map(person),
    datePublished: publication.date,
    publisher: { '@type': 'Organization', name: publication.publisher },
    identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: publication.doi },
    license: publication.license.url,
    isAccessibleForFree: true,
    ...(publication.kind === 'Software'
      ? {
          version: publication.version,
          programmingLanguage: 'Lean 4',
          codeRepository: LINKS.framework,
        }
      : { headline: publication.title }),
  };
}
