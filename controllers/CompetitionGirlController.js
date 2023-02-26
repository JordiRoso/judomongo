import CompetitionGirl from "../models/CompetitionGirl.js";
import  CompetitionMen  from '../models/CompetitionMen.js';

const CompetitionGirlController = {};

CompetitionGirlController.create = async (req, res) => {
  try {
    const existingCompetition = await CompetitionGirl.findOne({ name: req.body.name, year:req.body.year, category: req.body.category,} );

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

// CompetitionGirlController.create = async (req, res) => {
//     try {
//       const competition = await CompetitionGirl.findOne({
        
//         name: req.body.name,
//         year: req.body.year,
//         category: req.body.category
//       });
//       console.log(competition);
  
//       if (competition) {
//         // Si la competición ya existe, se deben actualizar los resultados existentes y agregar los nuevos resultados
//         const existingResults = competition.results;
//         const newResults = req.body.results || [];
  
//         // Actualizar los resultados existentes
//         for (let i = 0; i < existingResults.length; i++) {
//           const existingResult = existingResults[i];
//           const newResult = newResults.find(r => r.weight === existingResult.weight && r.position === existingResult.position);
  
//           if (newResult) {
//             // Si el resultado ya existe en la competición, actualizar el resultado existente
//             existingResults[i] = newResult;
//           }
//         }
  
//         // Agregar los nuevos resultados
//         for (let i = 0; i < newResults.length; i++) {
//           const newResult = newResults[i];
//           const existingResult = existingResults.find(r => r.weight === newResult.weight && r.position === newResult.position);
  
//           if (!existingResult) {
//             // Si el resultado no existe en la competición, agregar el nuevo resultado
//             existingResults.push(newResult);
//           }
//         }
  
//         // Guardar la competición actualizada en la base de datos
//         const savedCompetition = await competition.save();
  
//         return res.status(200).json({
//           success: true,
//           message: 'Competición actualizada correctamente',
//           data: savedCompetition
//         });
//       }
  
//       // Si la competición no existe, se crea una nueva competición con los resultados dados
//       const competitionData = {
//         name: req.body.name,
//         year: req.body.year,
//         category: req.body.category,
//         results: req.body.results || []
//       };
  
//       const newCompetition = new CompetitionGirl(competitionData);
//       const savedCompetition = await newCompetition.save();
  
//       return res.status(200).json({
//         success: true,
//         message: 'Competición creada correctamente',
//         data: savedCompetition
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: 'Error al crear o actualizar la competición siiii',
//         error: error.message
//       });
//     }
//   };


// 
// CompetitionGirlController.create = async (req, res) => {
//   try {
//     const filter = {
//       name: req.body.name,
//       year: req.body.year,
//       category: req.body.category,
//       gender: req.body.gender
//     };

//     const competition = await CompetitionGirl.findOne(filter);

//     if (competition) {
//       const existingResults = competition.results;
//       const newResults = req.body.results || [];

//       // Actualizar resultados existentes
//       for (let i = 0; i < newResults.length; i++) {
//         const newResult = newResults[i];
//         const existingResult = existingResults.find(r => r.weight === newResult.weight && r.position === newResult.position);

//         if (existingResult) {
//           existingResult.name = newResult.name || existingResult.name;
//           existingResult.club = newResult.club || existingResult.club;
//         } else {
//           existingResults.push(newResult);
//         }
//       }

//       competition.results = existingResults;
//       await competition.save();

//       return res.status(200).json({
//         success: true,
//         message: 'Competición actualizada correctamente',
//         data: competition
//       });
//     } else {
//       const competitionData = {
//         name: req.body.name,
//         location: req.body.location,
//         gender: req.body.gender,
//         category: req.body.category,
//         year: req.body.year,
//         results: req.body.results || []
//       };

//       const newCompetition = new CompetitionGirl(competitionData);
//       const savedCompetition = await newCompetition.save();

//       return res.status(200).json({
//         success: true,
//         message: 'Competición creada correctamente',
//         data: savedCompetition
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Error al crear o actualizar la competición',
//       error: error.message
//     });
//   }
// };



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

        // CompetitionGirlController.deleteResult = async (req, res) => {
        //     const resultId = req.params.id;
        //     try {
        //         const competition = await CompetitionGirl.findOne({ "results._id": resultId });
        //         if (!competition) {
        //             return res.status(404).json({
        //                 success: false,
        //                 message: "Result not found"
        //             });
        //         }
        //         competition.results.id(resultId).remove();
        //         await competition.save();
        //         return res.status(200).json({
        //             success: true,
        //             message: "Result deleted successfully"
        //         });
        //     } catch (error) {
        //         return res.status(500).json({
        //             success: false,
        //             message: "Error deleting result",
        //             error: error.message
        //         });
        //     }
        // };

        // CompetitionGirlController.update = async (req, res) => {
        //     const competitionId = req.params.id;
        //     try {
        //     const competition = await CompetitionGirl.findOneAndUpdate(
        //     { _id: competitionId },
        //     req.body,
        //     { new: true }
        //     );
        //     if (!competition) {
        //     return res.status(404).json({
        //     success: false,
        //     message: "Competition not found",
        //     });
        //     }
        //     return res.status(200).json({
        //     success: true,
        //     message: "Competition updated successfully",
        //     data: competition,
        //     });
        //     } catch (error) {
        //     return res.status(500).json({
        //     success: false,
        //     message: "Error updating competition",
        //     error: error.message,
        //     });
        //     }
        //     };

        // aquest d'aqui sorta es el bo

            // CompetitionGirlController.update = async function updateCompetition(req, res) {
            //   const competitionId = req.params.id;
            //   const results = req.body.results;
            //   try {
            //     const competition = await CompetitionGirl.findOneAndUpdate(
            //       { _id: competitionId },
            //       { $set: { results: results } },
            //       { new: true }
            //     );
            //     if (!competition) {
            //       return res.status(404).json({
            //         success: false,
            //         message: "Competition not found",
            //       });
            //     }
            //     return res.status(200).json({
            //       success: true,
            //       message: "Competition results updated successfully",
            //       data: competition,
            //     });
            //   } catch (error) {
            //     return res.status(500).json({
            //       success: false,
            //       message: "Error updating competition results",
            //       error: error.message,
            //     });
            //   }
            // }

// aquest de sot aes el millor. funciona super be!!!

            // CompetitionGirlController.update = async function updateCompetition(req, res) {
            //   const competitionId = req.params.id;
            //   const newResults = req.body.results;
            //   try {
            //     // Obtener la competición existente
            //     const competition = await CompetitionGirl.findById(competitionId);
            //     if (!competition) {
            //       return res.status(404).json({
            //         success: false,
            //         message: "Competition not found",
            //       });
            //     }
            
            //     // Combinar los resultados existentes con los nuevos resultados
            //     const combinedResults = [...competition.results];
            //     newResults.forEach((newResult) => {
            //       const index = combinedResults.findIndex((result) => result._id === newResult._id);
            //       if (index === -1) {
            //         combinedResults.push(newResult);
            //       } else {
            //         combinedResults[index] = newResult;
            //       }
            //     });
            
            //     // Actualizar la competición con los resultados combinados
            //     competition.results = combinedResults;
            //     const updatedCompetition = await competition.save();
            //     return res.status(200).json({
            //       success: true,
            //       message: "Competition results updated successfully",
            //       data: updatedCompetition,
            //     });
            //   } catch (error) {
            //     return res.status(500).json({
            //       success: false,
            //       message: "Error updating competition results",
            //       error: error.message,
            //     });
            //   }
            // };
            
            

            // CompetitionGirlController.update = async function updateCompetition(req, res) {
            //   const competitionId = req.params.id;
            //   const newResults = req.body.results;
            //   try {
            //     // Obtener la competición existente
            //     const competition = await CompetitionGirl.findById(competitionId);
            //     if (!competition) {
            //       return res.status(404).json({
            //         success: false,
            //         message: "Competition not found",
            //       });
            //     }
            
            //     // Combinar los resultados existentes con los nuevos resultados
            //     const isIdentical = (result1, result2) => {
            //       return (
            //         result1.weight === result2.weight &&
            //         result1.position === result2.position &&
            //         result1.name === result2.name &&
            //         result1.club === result2.club
            //       );
            //     };
            //     const combinedResults = [...competition.results];
            //     newResults.forEach((newResult) => {
                  
            //       const index = combinedResults.findIndex((result) => isIdentical(result, newResult));
            //       if (index === -1) {
            //         combinedResults.push(newResult);
            //       } else {
            //         combinedResults[index] = newResult;
            //       }
            //     });
                
            //     // Actualizar la competición con los resultados combinados
            //     competition.results = combinedResults;
            //     const updatedCompetition = await competition.save();
            //     return res.status(200).json({
            //       success: true,
            //       message: "Competition results updated successfully",
            //       data: updatedCompetition,
            //     });
            //   } catch (error) {
            //     return res.status(500).json({
            //       success: false,
            //       message: "Error updating competition results",
            //       error: error.message,
            //     });
            //   }
            // };
            // Aquest es l'ultim que he fet que tindroia que funcionatr

            function isIdentical(existingResult, newResult) {
              return existingResult.weight === newResult.weight &&
                     existingResult.position === newResult.position &&
                     existingResult.name === newResult.name &&
                     existingResult.club === newResult.club;
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

            // CompetitionGirlController.update = async function updateCompetition(req, res) {
            //   const competitionId = req.params.id;
            //   const newResults = req.body.results;
            
            //   // Verificar si la competición es para chicas o para chicos
            //   const isGirlCompetition = req.path.includes('competitionGirl');
            
            //   try {
            //     // Obtener la competición existente
            //     const competition = isGirlCompetition ? await CompetitionGirl.findById(competitionId) : await CompetitionMen.findById(competitionId);
            //     if (!competition) {
            //       return res.status(404).json({
            //         success: false,
            //         message: "Competition not found",
            //       });
            //     }
            //     // Actualizar los resultados existentes con los nuevos resultados
            //     let updated = false;
            //     for (let i = 0; i < newResults.length; i++) {
            //       const newResult = newResults[i];
            //       let identicalResult = null;
            
            //       for (let j = 0; j < competition.results.length; j++) {
            //         const existingResult = competition.results[j];
            //         if (isIdentical(existingResult, newResult)) {
            //           identicalResult = existingResult;
            //           break;
            //         }
            //       }
            
            //       if (!identicalResult) {
            //         competition.results.push(newResult);
            //         updated = true;
            //       } else {
            //         let hasChanged = false;
            //         if (identicalResult.name !== newResult.name) {
            //           identicalResult.name = newResult.name;
            //           hasChanged = true;
            //         }
            //         if (identicalResult.weight !== newResult.weight) {
            //           identicalResult.weight = newResult.weight;
            //           hasChanged = true;
            //         }
            //         if (identicalResult.position !== newResult.position) {
            //           identicalResult.position = newResult.position;
            //           hasChanged = true;
            //         }
            //         if (identicalResult.club !== newResult.club) {
            //           identicalResult.club = newResult.club;
            //           hasChanged = true;
            //         }
            //         if (hasChanged) {
            //           updated = true;
            //         }
            //       }
            //     }
            
            //     if (updated) {
            //       // Actualizar la competición con los resultados combinados
            //       const updatedCompetition = await competition.save();
            //       return res.status(200).json({
            //         success: true,
            //         message: "Competition results updated successfully",
            //         data: updatedCompetition,
            //       });
            //     } else {
            //       return res.status(200).json({
            //         success: true,
            //         message: "Competition results are already up to date",
            //         data: competition,
            //       });
            //     }
            
                
            //   } catch (error) {
            //     return res.status(500).json({
            //       success: false,
            //       message: "Error updating competition results",
            //       error: error.message,
            //     });
            //   }
            // };
            
            

            // CompetitionGirlController.update = async function updateCompetition(req, res) {
            //   const competitionId  = req.params.id;
            //   const newResults = req.body;
            //   try {
            //     const competition = await CompetitionGirl.findOneAndUpdate(
            //       { _id: competitionId },
            //       { $set: newResults },
            //       { new: true }
            //     );
            //     if (!user) {
            //       return res.status(404).json({
            //         success: false,
            //         message: "User not found",
            //       });
            //     }
            //     return res.status(200).json({
            //       success: true,
            //       message: "User updated successfully",
            //       data: competition,
            //     });
            //   } catch (error) {
            //     return res.status(500).json({
            //       success: false,
            //       message: "Error updating user",
            //       error: error.message,
            //     });
            //   }
            // };
            


        // CompetitionGirlController.update = async (req, res) => {
        //   const competitionId = req.params.id;
        //   try {
        //     let competition = await CompetitionGirl.findOne({ _id: competitionId });
        //     let model = CompetitionGirl;
        
        //     if (!competition) {
        //       competition = await CompetitionMen.findOne({ _id: competitionId });
        //       model = CompetitionMen;
        //     }
        
        //     if (!competition) {
        //       return res.status(404).json({
        //         success: false,
        //         message: "Competition not found",
        //       });
        //     }
        
        //     const updatedCompetition = await model.findOneAndUpdate(
        //       { _id: competitionId },
        //       req.body,
        //       { new: true }
        //     );
        
        //     return res.status(200).json({
        //       success: true,
        //       message: "Competition updated successfully",
        //       data: updatedCompetition,
        //     });
        //   } catch (error) {
        //     return res.status(500).json({
        //       success: false,
        //       message: "Error updating competition",
        //       error: error.message,
        //     });
        //   }
        // };
        


            // CompetitionGirlController.update = async (req, res) => {
            //     try {
            //       const competition = await CompetitionGirl.findOne({ _id: req.params.competitionId });
              
            //       if (!competition) {
            //         return res.status(404).json({
            //           success: false,
            //           message: 'Competición no encontrada'
            //         });
            //       }
              
            //       const result = competition.results.id(req.params.resultId);
              
            //       if (!result) {
            //         return res.status(404).json({
            //           success: false,
            //           message: 'Resultado no encontrado en la competición'
            //         });
            //       }
              
            //       // Actualizar los valores del resultado
            //       if (req.body.weight) {
            //         result.weight = req.body.weight;
            //       }
              
            //       if (req.body.position) {
            //         result.position = req.body.position;
            //       }
              
            //       const updatedCompetition = await competition.save();
              
            //       return res.status(200).json({
            //         success: true,
            //         message: 'Resultado actualizado correctamente',
            //         data: updatedCompetition
            //       });
            //     } catch (error) {
            //       return res.status(500).json({
            //         success: false,
            //         message: 'Error al actualizar el resultado',
            //         error: error.message
            //       });
            //     }
            //   };

            // CompetitionGirlController.update = async (req, res) => {
            //   // try {
            //   //   const competition = await CompetitionGirl.findOne({
            //   //     name: req.body.name,
            //   //     year: req.body.year,
            //   //     category: req.body.category
            //   //   });
            //   const competitionId = req.params.id;
            //   const results = req.body.results;
            //   try {
            //     const competition = await CompetitionGirl.findOneAndUpdate(
            //       { _id: competitionId },
            //       { $set: { results: results } },
            //       { new: true }
            //     );
            
            //     if (!competition) {
            //       return res.status(404).json({
            //         success: false,
            //         message: 'Competition not found'
            //       });
            //     }
            
            //     // Actualizar resultados existentes y agregar nuevos
            //     const updatedResults = req.body.results.map((newResult) => {
            //       const existingResult = competition.results.find((result) => {
            //         return result.weight === newResult.weight && result.position === newResult.position;
            //       });
            //       if (existingResult) {
            //         return {
            //           ...existingResult,
            //           name: newResult.name,
            //           club: newResult.club
            //         };
            //       } else {
            //         return newResult;
            //       }
            //     });
            
            //     // Agregar resultados nuevos que no existen
            //     const newResults = competition.results.filter((existingResult) => {
            //       return !req.body.results.some((newResult) => {
            //         return newResult.weight === existingResult.weight && newResult.position === existingResult.position;
            //       });
            //     }).concat(req.body.results.filter((newResult) => {
            //       return !competition.results.some((existingResult) => {
            //         return existingResult.weight === newResult.weight && existingResult.position === newResult.position;
            //       });
            //     }));
            
            //     competition.results = updatedResults.concat(newResults);
            
            //     const savedCompetition = await competition.save();
            
            //     return res.status(200).json({
            //       success: true,
            //       message: 'Competition updated successfully',
            //       data: savedCompetition
            //     });
            //   } catch (error) {
            //     return res.status(500).json({
            //       success: false,
            //       message: 'Error updating competition',
            //       error: error.message
            //     });
            //   }
            // };


            


            




            





            
              
            
            
            
            
            
            
        
        
    
    
    
    


export default CompetitionGirlController;
