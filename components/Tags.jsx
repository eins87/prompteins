import { options } from '@utils/constants/constants';
import Autocomplete from '@mui/material/Autocomplete';
import { matchSorter } from 'match-sorter';
import TextField from '@mui/material/TextField';

const Tags = ({ post, setPost }) => {

  const OnChange = (e, newValue) => {
    setPost({ ...post, tag: newValue.map((tag) => tag.value) });
  }

  const filterOptions = (option, { inputValue }) => {
    const matches = matchSorter(option, inputValue, { keys: ['value'] });
    if (matches.length === 0) {
      return [
        { value: inputValue},
      ];
    }

    return matches;
  }

  const getOptionLabel = (option) => {
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.value;
  }

  const renderInput = (params) => {
    return (
      <TextField { ...params} label="Tags" />
    );
  }

  // use external source of tags
  //
  // useEffect(() => {
  //     const fetchTags = async () => {
  //         const response = await fetch('/api/tags');
  //         const data = await response.json();
  //         // console.log(data);

  //         setTags(data);
  //     }
  //     if (session?.user.id) fetchTags();
  // }, []);

  return (
    <Autocomplete
      sx={{ bgcolor: 'white' }}
      id="size-small-standard-multi"
      size="small"
      value={post.tag.map((tag) => ({ value: tag, label: tag })) || []}
      multiple
      selectOnFocus
      options={options.map((name) => ({ value: name }))}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={renderInput}
      onChange={OnChange}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
    />
  )
}

export default Tags