import CompetitionMen from "../models/CompetitionMen.js";
import CompetitionGirl from "../models/CompetitionGirl.js";

const CompetitionMenController = {};
// const CompetitionGirlController = {};

CompetitionMenController.create = async (req, res) => {
  try {
    const existingCompetition = await CompetitionMen.findOne({ name: req.body.name, year:req.body.year, category: req.body.category } );

    if (existingCompetition) {
      return res.status(400).json(
        {
        success: false,
        message: 'Competicion ya exiute',
        data: existingCompetition,
      }
      );
    }
    const competition = new CompetitionMen(req.body);
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



CompetitionMenController.getByNameAndYear = async (req, res) => {
    const name = req.params.name;
    const year = req.params.year;
    
    try {
    const competition = await CompetitionMen.findOne({ name: name, year: year });
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

    CompetitionMenController.getById = async (req, res) => {
        const id = req.params._id;
        try {
        const competition = await CompetitionMen.findById(id);
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


        CompetitionMenController.getByName = async (req, res) => {
            const name = req.params.name;
            try {
                const competition = await CompetitionMen.findOne({ name: name });
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
                  message: "Competition not found"
                });
              }
              if (weight) {
                competition = competition.map(comp => {
                  comp.results = comp.results.filter(result => result.weight === weight);
                  return comp;
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
          
          

        

        CompetitionMenController.deleteResult = async (req, res) => {
            const resultId = req.params.id;
            try {
                const competition = await CompetitionMen.findOne({ "results._id": resultId });
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

        CompetitionMenController.update = async (req, res) => {
            const competitionId = req.params.id;
            try {
            const competition = await CompetitionMen.findOneAndUpdate(
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

            CompetitionMenController.getAll = async (req, res) => {
              try {
                const competitionMen = await CompetitionMen.find({});
                const competitionGirl = await CompetitionGirl.find({});
                const competition = [...competitionMen, ...competitionGirl];
                return res.status(200).json({
                  success: true,
                  message: "Competitions retrieved successfully",
                  data: competition
                });
              } catch (error) {
                return res.status(500).json({
                  success: false,
                  message: "Error retrieving competitions",
                  error: error.message
                });
              }
            };
              
              


            
            

           
export default CompetitionMenController;
