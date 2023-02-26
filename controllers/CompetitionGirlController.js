import CompetitionGirl from "../models/CompetitionGirl.js";
import CompetitionMen from "../models/CompetitionMen.js";

const CompetitionGirlController = {};

CompetitionGirlController.create = async (req, res) => {
  try {
    const existingCompetition = await CompetitionGirl.findOne({
      name: req.body.name,
      year: req.body.year,
      category: req.body.category,
    });

    if (existingCompetition) {
      return res.status(400).json({
        success: false,
        message: "Competicion ya exiute",
        data: existingCompetition,
      });
    }
    const competition = new CompetitionGirl(req.body);
    const savedCompetition = await competition.save();

    return res.status(200).json({
      success: true,
      message: "Competition created successfully siiiiii",
      data: savedCompetition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating competition",
      error: error.message,
    });
  }
};

CompetitionGirlController.getById = async (req, res) => {
  const id = req.params._id;
  try {
    const competition = await CompetitionGirl.findById(id);
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Competition retrieved successfully",
      data: competition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving competition",
      error: error.message,
    });
  }
};

CompetitionGirlController.getByName = async (req, res) => {
  const name = req.params.name;
  try {
    const competition = await CompetitionGirl.findOne({ name: name });
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Competition retrieved successfully",
      data: competition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving competition",
      error: error.message,
    });
  }
};

CompetitionGirlController.search = async (req, res) => {
  const name = req.query.name;
  const year = req.query.year;
  let searchCriteria = {};
  if (name) {
    searchCriteria.name = name;
  }
  if (year) {
    searchCriteria.year = year;
  }
  try {
    const competition = await CompetitionGirl.find(searchCriteria);
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Competition retrieved successfully",
      data: competition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving competition",
      error: error.message,
    });
  }
};

function isIdentical(existingResult, newResult) {
  return (
    existingResult.weight === newResult.weight &&
    existingResult.position === newResult.position &&
    existingResult.name === newResult.name &&
    existingResult.club === newResult.club
  );
}

CompetitionGirlController.update = async function updateCompetition(req, res) {
  const competitionId = req.params.id;
  const newResults = req.body.results;

  try {
    // Obtener la competición existente
    const competition = await CompetitionGirl.findById(competitionId);
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    // Actualizar los resultados existentes con los nuevos resultados
    let updated = false;
    for (let i = 0; i < newResults.length; i++) {
      const newResult = newResults[i];
      let identicalResult = null;

      for (let j = 0; j < competition.results.length; j++) {
        const existingResult = competition.results[j];
        if (isIdentical(existingResult, newResult)) {
          identicalResult = existingResult;
          break;
        }
      }

      if (!identicalResult) {
        competition.results.push(newResult);
        updated = true;
      } else {
        let hasChanged = false;
        if (identicalResult.name !== newResult.name) {
          identicalResult.name = newResult.name;
          hasChanged = true;
        }
        if (identicalResult.weight !== newResult.weight) {
          identicalResult.weight = newResult.weight;
          hasChanged = true;
        }
        if (identicalResult.position !== newResult.position) {
          identicalResult.position = newResult.position;
          hasChanged = true;
        }
        if (identicalResult.club !== newResult.club) {
          identicalResult.club = newResult.club;
          hasChanged = true;
        }
        if (hasChanged) {
          updated = true;
        }
      }
    }

    if (updated) {
      // Actualizar la competición con los resultados combinados
      const updatedCompetition = await competition.save();
      return res.status(200).json({
        success: true,
        message: "Competition results updated successfully",
        data: updatedCompetition,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Competition results are already up to date",
        data: competition,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating competition results",
      error: error.message,
    });
  }
};

export default CompetitionGirlController;
