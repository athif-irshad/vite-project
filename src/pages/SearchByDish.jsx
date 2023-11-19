import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";

const loadOptions = async (inputValue, callback) => {
  try {
    const res = await axios.get(`https://recipe-search-88c61755925f.herokuapp.com/v1/recipes${inputValue ? `?title=${inputValue}` : ''}`);
    let data;
    if (res.data.recipes.length) {
      data = res.data.recipes.map((item) => ({
        label: item.title,
        value: item.title,
        id: item.id,
        cook_time: item.cook_time,
        difficulty: item.difficulty,
        cuisine_name: item.cuisine_name,
      }));
    } else {
      data = [];
    }
    callback(data);
  } catch (error) {
    console.error(error);
  }
};

const SearchByDish = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Box p={5}>
      <Box mb={5}>
        <AsyncSelect
          cacheOptions
          defaultOptions={true}
          loadOptions={loadOptions}
          onChange={handleChange}
        />
      </Box>
      {selectedOption && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Cook Time</Th>
              <Th>Difficulty</Th>
              <Th>Cuisine</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{selectedOption.label}</Td>
              <Td>{selectedOption.cook_time}</Td>
              <Td>{selectedOption.difficulty}</Td>
              <Td>{selectedOption.cuisine_name}</Td>
              <Td>
                <Link href={`/recipe/${selectedOption.id}`} isExternal>
                  View Recipe
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default SearchByDish;
