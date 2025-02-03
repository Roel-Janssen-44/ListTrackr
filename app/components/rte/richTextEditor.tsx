import { Editor, EditorContainer } from './editor';
import {
  Plate,
  PlateElement,
  PlateLeaf,
  usePlateEditor,
  PlateContent,
} from '@udecode/plate/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { withProps } from '@udecode/cn';

const basicEditorValue = [
  {
    id: '1',
    children: [
      {
        text: '🌳 Blocks',
      },
    ],
    type: 'h1',
  },
  {
    id: '2',
    children: [
      {
        text: 'Easily create headings of various levels, from H1 to H6, to structure your content and make it more organized.',
      },
    ],
    type: 'p',
  },
  {
    id: '3',
    children: [
      {
        text: 'Create blockquotes to emphasize important information or highlight quotes from external sources.',
      },
    ],
    type: 'blockquote',
  },
  {
    id: '1',
    children: [
      {
        text: '🌱 Marks',
      },
    ],
    type: 'h1',
  },
  {
    id: '2',
    children: [
      {
        text: 'Add style and emphasis to your text using the mark plugins, which offers a variety of formatting options.',
      },
    ],
    type: 'p',
  },
  {
    id: '3',
    children: [
      {
        text: 'Make text ',
      },
      {
        bold: true,
        text: 'bold',
      },
      {
        text: ', ',
      },
      {
        italic: true,
        text: 'italic',
      },
      {
        text: ', ',
      },
      {
        text: 'underlined',
        underline: true,
      },
      {
        text: ', or apply a ',
      },
      {
        bold: true,
        italic: true,
        text: 'combination',
        underline: true,
      },
      {
        text: ' of these styles for a visually striking effect.',
      },
    ],
    type: 'p',
  },
];

export default function BasicEditor() {
  const editor = usePlateEditor({
    value: basicEditorValue,
    plugins: [HeadingPlugin, BlockquotePlugin],
    override: {
      components: {
        blockquote: withProps(PlateElement, {
          as: 'blockquote',
          className: 'mb-4 border-l-4 border-[#d0d7de] pl-4 text-[#636c76]',
        }),
        bold: withProps(PlateLeaf, { as: 'strong' }),
        h1: withProps(PlateElement, {
          as: 'h1',
          className:
            'mb-4 mt-6 text-3xl font-semibold tracking-tight lg:text-4xl',
        }),
        h2: withProps(PlateElement, {
          as: 'h2',
          className: 'mb-4 mt-6 text-2xl font-semibold tracking-tight',
        }),
        h3: withProps(PlateElement, {
          as: 'h3',
          className: 'mb-4 mt-6 text-xl font-semibold tracking-tight',
        }),
        italic: withProps(PlateLeaf, { as: 'em' }),
        p: withProps(PlateElement, {
          as: 'p',
          className: 'mb-4',
        }),
        underline: withProps(PlateLeaf, { as: 'u' }),
      },
    },
  });

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        // For performance, debounce your saving logic
        // localStorage.setItem('editorContent', JSON.stringify(value));
      }}
    >
      <PlateContent placeholder="Type..." />
      {/* <EditorContainer>
        <Editor placeholder="Type..." />
      </EditorContainer> */}
    </Plate>
  );
}
