import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import './pagination';
import './page-sizes-select';
import './pages-select';

const createProps = () => ({
  atLastPage: boolean('Explicitly state that the user is at the last page (at-last-apge)', false),
  pageSize: number('Number of rows per page (page-size)', 10),
  start: number('Start row index of the current page (start)', 0),
  total: number('Total rows count (total)', 100),
  onChangedCurrent: action('bx-pagination-changed-current'),
  onChangedPageSizesSelect: action('bx-page-sizes-select-changed'),
});

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { atLastPage, pageSize, start, total, onChangedCurrent, onChangedPageSizesSelect } = createProps();
    return html`
      <bx-pagination
        ?at-last-page="${atLastPage || undefined}"
        page-size="${pageSize}"
        start="${start}"
        total="${total}"
        @bx-pagination-changed-current="${onChangedCurrent}"
        @bx-page-sizes-select-changed="${onChangedPageSizesSelect}"
      >
        <bx-page-sizes-select slot="page-sizes-select">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </bx-page-sizes-select>
        <bx-pages-select></bx-pages-select>
      </bx-pagination>
    `;
  });
