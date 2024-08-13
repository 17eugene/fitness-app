import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Typography, Box, Button, Stack, TextField } from "@mui/material";
import HorizontalSlider from "../HorizontalSlider/HorizontalSlider";
import {
  exercisesUrl,
  bodyPartsUrl,
  options,
  fetchData,
} from "../../api/fetchData";

const Search = ({
  setExercises,
  bodyPart,
  setBodyPart,
  setSearchParams,
  muscleGroup,
}) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchBodyPartsData = async () => {
      const bodyPartsData = await fetchData(bodyPartsUrl, options);
      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchBodyPartsData();
  }, []);

  const inputHandleChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleClick = async () => {
    if (searchValue || muscleGroup) {
      setSearchParams({ query: searchValue });

      const exercisesData = await fetchData(exercisesUrl, options);
      const searchedExercises = exercisesData?.filter(
        (exercise) =>
          exercise.name.toLowerCase().trim().includes(searchValue) ||
          exercise.bodyPart.toLowerCase().trim().includes(searchValue) ||
          exercise.equipment.toLowerCase().trim().includes(searchValue) ||
          exercise.target.toLowerCase().trim().includes(searchValue)
      );
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" mt="3rem" p="1.25rem">
      <Typography
        textAlign="center"
        fontWeight="600"
        mb="3rem"
        sx={{ fontSize: { lg: "40px", xs: "30px" } }}
      >
        Awesome exercises you <br /> should know
      </Typography>
      <Box display="flex" sx={{ width: { lg: "850px", sm: "550px" } }}>
        <TextField
          sx={{
            minWidth: "200px",
            flex: "1",
            border: "none",
            outline: "none",
            backgroundColor: "#fff",
            input: {
              outline: "none",
              height: "2rem",
              p: "0.75rem 1.5rem 0.75rem 1rem",
            },
          }}
          value={searchValue}
          type="text"
          onChange={inputHandleChange}
          placeholder="Search..."
        />
        <Button
          sx={{
            height: "2rem",
            fontSize: { lg: "1.25rem", sm: "1rem" },
            backgroundColor: "#ff2625",
            "&:disabled": { backgroundColor: "#ff262588" },
            color: "#fff",
            "&:hover": { backgroundColor: "#dc1122" },
            textTransform: "none",
            p: { lg: "1.75rem 2.55rem", xs: "1.75rem 1.1rem" },
          }}
          onClick={handleClick}
          disabled={!searchValue.trim()}
        >
          Search
        </Button>
      </Box>
      <HorizontalSlider
        data={bodyParts}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        isBodyParts
        setSearchParams={setSearchParams}
      />
    </Stack>
  );
};

export default Search;
