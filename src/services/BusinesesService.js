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
export const approveBusineses = async (id) => {
  const Businesestoapprove = await Busineses.findOne(
    { where: { id } }

  );
  if (Businesestoapprove) {
    await Busineses.update({ status: "approved" }, { where: { id } });
    return Businesestoapprove;
  }
  return null;
};

export const ckeckBusineses = async (id) => {
  const Businesestoapprove = await Busineses.findOne(
    { where: { id } }

  );
  if (Businesestoapprove) {
    await Busineses.update({ status: "checked" }, { where: { id } });
    return Businesestoapprove;
  }
  return null;
};

export const unckeckBusineses = async (id) => {
  const Businesestoapprove = await Busineses.findOne(
    { where: { id } }

  );
  if (Businesestoapprove) {
    await Busineses.update({ status: "pending" }, { where: { id } });
    return Businesestoapprove;
  }
  return null;
};


export const rejectBusineses = async (id) => {
  const Businesestoapprove = await Busineses.findOne(
    { where: { id } }

  );
  if (Businesestoapprove) {
    await Busineses.update({ status: "rejected" }, { where: { id } });
    return Businesestoapprove;
  }
  return null;
};



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



export const pending = async (id) => {
  const pending = await Busineses.findAll({ where: { status:'pending' } });
  if (pending) {
    return pending;
  }
  return null;
};

export const getone = async (id) => {
  try {
    const events = await Busineses.findAll({
      where: {
        id: id,
      },
   
      include: [
        {
          model: users,
          as: "BusinesesUser",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });

    if (!events || events.length === 0) {
      return null;
    }



    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};



export const checkExistingBusineses = async (title) => {
  return await Busineses.findOne({
    where: {
      title,
    },
  });
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

