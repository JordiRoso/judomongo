import CompetitionGirl from "../models/CompetitionGirl.js";

const CompetitionGirlController = {};

CompetitionGirlController.create = async (req, res) => {
  try {
    const existingCompetition = await CompetitionGirl.findOne({ name: req.body.name, year:req.body.year, category: req.body.category } );

    if (existingCompetition) {
      return res.status(400).json(
        {
        success: false,
        message: 'Competicion ya exiute',
        data: existingCompetition,
      }
      );
    }
    const competition = new CompetitionGirl(req.body);
    const savedCompetition = await competition.save();

    return res.status(200).json({
      success: true,
      message: 'Competition created successfully siiiiii',
      data: savedCompetition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating competition',
      error: error.message,
    });
  }
};



CompetitionGirlController.getByNameAndYear = async (req, res) => {
    const name = req.params.name;
    const year = req.params.year;
    
    try {
    const competition = await CompetitionGirl.findOne({ name: name, year: year });
    console.log(competition);
    if (!competition) {
    return res.status(404).json({
    success: false,
    message: 'Competition not foundbbb',
    });
    }
    
    
    return res.status(200).json({
      success: true,
      message: 'Competition found',
      data: competition,
    });
    } catch (error) {
    return res.status(500).json({
    success: false,
    message: 'Error fetching competition',
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
        message: "Competition not found"
        });
        }
        return res.status(200).json({
        success: true,
        message: "Competition retrieved successfully",
        data: competition
        });
        } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Error retrieving competition",
        error: error.message
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
                        message: "Competition not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Competition retrieved successfully",
                    data: competition
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error retrieving competition",
                    error: error.message
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
                        message: "Competition not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Competition retrieved successfully",
                    data: competition
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error retrieving competition",
                    error: error.message
                });
            }
        };

        CompetitionGirlController.deleteResult = async (req, res) => {
            const resultId = req.params.id;
            try {
                const competition = await CompetitionGirl.findOne({ "results._id": resultId });
                if (!competition) {
                    return res.status(404).json({
                        success: false,
                        message: "Result not found"
                    });
                }
                competition.results.id(resultId).remove();
                await competition.save();
                return res.status(200).json({
                    success: true,
                    message: "Result deleted successfully"
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Error deleting result",
                    error: error.message
                });
            }
        };

        CompetitionGirlController.update = async (req, res) => {
            const competitionId = req.params.id;
            try {
            const competition = await CompetitionGirl.findOneAndUpdate(
            { _id: competitionId },
            req.body,
            { new: true }
            );
            if (!competition) {
            return res.status(404).json({
            success: false,
            message: "Competition not found",
            });
            }
            return res.status(200).json({
            success: true,
            message: "Competition updated successfully",
            data: competition,
            });
            } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Error updating competition",
            error: error.message,
            });
            }
            };
            
            
            
            
            
            
        
        
    
    
    
    


export default CompetitionGirlController;
