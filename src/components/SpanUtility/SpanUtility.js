import styled from 'styled-components';
import { compose, spacing, palette  } from '@material-ui/system';

const SpanUtility = styled('span')(
  compose(spacing, palette)
);

export default SpanUtility;
