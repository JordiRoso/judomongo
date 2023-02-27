import CompetitionMen from "../models/CompetitionMen.js";
import CompetitionGirl from "../models/CompetitionGirl.js";

const CompetitionMenController = {};
// const CompetitionGirlController = {};

CompetitionMenController.create = async (req, res) => {
  try {
    const existingCompetition = await CompetitionMen.findOne({
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
    const competition = new CompetitionMen(req.body);
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

CompetitionMenController.CreateCompetitors = async (req, res) => {
  const competitionId = req.params.competitionId;
  const newResultData = req.body;

  try {
    const competition = await CompetitionMen.findById(competitionId);

    if (!competition) {
      throw new Error("Competition not found");
    }

    const newResult = {
      weight: newResultData.weight,
      position: newResultData.position,
      name: newResultData.name,
      club: newResultData.club,
    };

    competition.results.push(newResult);
    await competition.save();

    res.status(201).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating result" });
  }
};

CompetitionMenController.getByNameAndYear = async (req, res) => {
  const name = req.params.name;
  const year = req.params.year;

  try {
    const competition = await CompetitionMen.findOne({
      name: name,
      year: year,
    });
    console.log(competition);
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not foundbbb",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Competition found",
      data: competition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching competition",
      error: error.message,
    });
  }
};

CompetitionMenController.getById = async (req, res) => {
  const id = req.params._id;
  try {
    const competition = await CompetitionMen.findById(id);
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

CompetitionMenController.getByName = async (req, res) => {
  const name = req.params.name;
  try {
    const competition = await CompetitionMen.findOne({ name: name });
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

CompetitionMenController.search = async (req, res) => {
  const name = req.query.name;
  const year = req.query.year;
  const gender = req.query.gender;
  const category = req.query.category;
  const weight = req.query.weight;
  let searchCriteria = {};
  if (name) {
    searchCriteria.name = name;
  }
  if (year) {
    searchCriteria.year = year;
  }
  if (gender) {
    searchCriteria.gender = gender;
  }
  if (category) {
    searchCriteria.category = category;
  }
  if (weight) {
    searchCriteria.weight = weight;
  }
  try {
    let competition;
    if (gender === "male") {
      competition = await CompetitionMen.find(searchCriteria);
    } else if (gender === "female") {
      competition = await CompetitionGirl.find(searchCriteria);
    }
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }
    if (weight) {
      competition = competition.map((comp) => {
        comp.results = comp.results.filter(
          (result) => result.weight === weight
        );
        return comp;
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

CompetitionMenController.deleteResult = async (req, res) => {
  const resultId = req.params.id;
  try {
    let competition = await CompetitionMen.findOne({
      "results._id": resultId,
    });
    if (!competition) {
      competition = await CompetitionGirl.findOne({
        "results._id": resultId,
      });
      if (!competition) {
        return res.status(404).json({
          success: false,
          message: "Result not found",
        });
      }
    }
    competition.results.id(resultId).remove();
    await competition.save();
    return res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting result",
      error: error.message,
    });
  }
};

CompetitionMenController.deleteCompetition = async (req, res) => {
  const resultId = req.params.id;
  try {
    let competition = await CompetitionMen.findById(resultId);
    if (!competition) {
      competition = await CompetitionGirl.findById(resultId);
      if (!competition) {
        return res.status(404).json({
          success: false,
          message: "Competition not found",
        });
      }
    }
    await competition.remove();
    return res.status(200).json({
      success: true,
      message: "Competition deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting competition",
      error: error.message,
    });
  }
};


CompetitionMenController.getAll = async (req, res) => {
  try {
    const competitionMen = await CompetitionMen.find({});
    const competitionGirl = await CompetitionGirl.find({});
    const competition = [...competitionMen, ...competitionGirl];
    return res.status(200).json({
      success: true,
      message: "Competitions retrieved successfully",
      data: competition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving competitions",
      error: error.message,
    });
  }
};

CompetitionMenController.getByMyId = async (req, res) => {
  const id = req.params._id;
  try {
    const [competitionGirl, competitionMen] = await Promise.all([
      CompetitionGirl.findById(id),
      CompetitionMen.findById(id),
    ]);
    const competition = competitionGirl || competitionMen;
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

CompetitionMenController.update = async function updateCompetition(req, res) {
  const competitionId = req.params.id;
  const newResults = req.body.results;

  try {
    // Obtener la competición existente
    const competition = await CompetitionMen.findById(competitionId);
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

export default CompetitionMenController;
