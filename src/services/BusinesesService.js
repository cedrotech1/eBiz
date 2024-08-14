import db from "../database/entity/index.js";

const users = db["User"];
const Korari = db["Koraris"];
const Busineses = db["Busineses"];



export const createBusineses = async (BusinesesData) => {
  try {
    return await Busineses.create(BusinesesData);
  } catch (error) {
    throw new Error(`Error creating Busineses: ${error.message}`);
  }
};

export const getAllBusineses = async () => {
  try {
    const AllBusineses = await Busineses.findAll(
      {
        include: [
          {
            model: users,
            as: "BusinesesUser",
          },
        ],
      }
    );

    return AllBusineses;
  } catch (error) {
    console.error("Error fetching all restaurants with users:", error);
    throw error;
  }
};



// ckeckBusineses



export const updateUser = async (userId, points) => {
  try {
    const userToUpdate = await users.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });

    if (userToUpdate) {
      await userToUpdate.update({ points: points });
      const updatedUser = await users.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });

      return updatedUser;
    }


    return null;
  } catch (error) {
    console.error("Error updating user with restaurant:", error);
    throw error;
  }
};

export const updateOneBusineses = async (id, BusinesesData) => {
  try {
    const BusinesesToUpdate = await Busineses.findOne({ where: { id } });
    
    if (!BusinesesToUpdate) {
      return null;
    }

    await Busineses.update(BusinesesData, { where: { id } });
    const updatedBusineses = await Busineses.findOne({ where: { id } });

    return updatedBusineses;
  } catch (error) {
    console.error('Error updating Busineses:', error);
    throw error;
  }
};

export const checkExistingBuz = async (businessId) => {
  try {
    const business = await Busineses.findOne({
      where: { 
        id: businessId,
      }
    });

    return business;
  } catch (error) {
    console.error("Error checking for existing favorite:", error);
    throw error;
  }
};







export const checkExistingBusineses = async (id) => {
  try {
    const business = await Busineses.findOne({
      where: { id },
    });

    return business; // Returns null if not found, otherwise returns the business object
  } catch (error) {
    console.error("Error checking business:", error);
    throw error;
  }
};

export const deleteOneBusineses = async (id) => {
  const restToDelete = await Busineses.findOne({ where: { id } });
  if (restToDelete) {
    await Busineses.destroy({ where: { id } });
    return restToDelete;
  }
  return null;
};


export const updateOneResto = async (id, resto) => {
  const restoToUpdate = await Busineses.findOne({ where: { id } });
  if (restoToUpdate) {
    await Busineses.update(resto, { where: { id } });
    return resto;
  }
  return null;
};

export const deactivateResto = async (id) => {
  const restoToUpdate = await Busineses.findOne({ where: { id } });
  if (restoToUpdate) {
    await Busineses.update({ status: 'inactive' }, { where: { id } });
    return restoToUpdate;
  }
  return null;
};

