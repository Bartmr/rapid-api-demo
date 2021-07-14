import React, { useState } from 'react';
import { useCallback } from 'react';
import { Page } from 'src/components/routing/page/page';
import { LinkAnchor } from '../../ui-kit/protons/link-anchor/link-anchor';
import { List } from './components/list';
import { INDEX_ROUTE } from './index-routes';
import { lorem, name, datatype, internet } from 'faker/locale/en_US';
import { v1 } from 'uuid';

const MOCK_DATA: Item[] = [];

for (let i = 0; i < 100; i++) {
  MOCK_DATA.push({
    id: v1(),
    name: name.firstName(),
    description: lorem.words(10),
    link: datatype.boolean() ? internet.url() : undefined,
  });
}

type Item = { id: string; name: string; description: string; link?: string };

function IndexTemplateContent() {
  const [selected, replaceSelected] = useState<Record<string, boolean>>({});

  const getId = useCallback((item: Item) => item.id, [MOCK_DATA]);
  const renderContent = useCallback((item: Item) => {
    return (
      <>
        <span className="font-weight-bold">{item.name}</span>
        <br />
        {item.description}
        <br />
        {item.link ? (
          <LinkAnchor href={item.link}>{item.link}</LinkAnchor>
        ) : null}
      </>
    );
  }, []);

  return (
    <List
      selected={selected}
      onSelectedChange={replaceSelected}
      data={MOCK_DATA}
      getId={getId}
      renderContent={renderContent}
    />
  );
}

export const IndexTemplate = () => (
  <Page authenticationRules={null} title={INDEX_ROUTE.label}>
    {() => {
      return <IndexTemplateContent />;
    }}
  </Page>
);
