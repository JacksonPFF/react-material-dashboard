import styled from 'styled-components';
import { compose, spacing, palette  } from '@material-ui/system';
import { Typography } from '@material-ui/core';

const TypographyWithSpacing = styled(Typography)(
  compose(spacing, palette)
);

export default TypographyWithSpacing;
