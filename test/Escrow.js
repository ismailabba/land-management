
const { expect } = require('chai');
const { ethers } = require('hardhat');


const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let buyer, seller, directorGeneral, surveyorGeneral, lender
    let landManagement, escrow

    beforeEach(async () => {
          //setup accounts
          [buyer, seller, directorGeneral, surveyorGeneral, lender ] = await ethers.getSigners()

        
          //console.log(signers)
          //deplot smatr contracts
  
          const LandManagement= await ethers.getContractFactory('LandManagement')
          landManagement = await LandManagement.deploy()
  
   
          //mint

          let transaction = await landManagement.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
          await transaction.wait()
         
        
          //console.log(landManagement.address)
  
          const Escrow = await ethers.getContractFactory('Escrow')
          escrow = await Escrow.deploy(
              landManagement.address,
              seller.address,
              directorGeneral.address,
              surveyorGeneral.address, 
              lender.address
          )


          //approve propery
          // Approve Property
         transaction = await landManagement.connect(seller).approve(escrow.address, 1)
         await transaction.wait()

         // List Property
        transaction = await escrow.connect(seller).list(1)
        await transaction.wait()

  
    })

    describe('Deployment', () => {
        
        it('Returns NFT address', async() => {
            const result = await  escrow.nftAddress()
            expect(result).to.be.equal(landManagement.address)
        })
        it('Returns seller', async() => {
            const result = await  escrow.seller()
            expect(result).to.be.equal(seller.address)
        })
        it('Returns director General', async() => {
            const result = await  escrow.directorGeneral()
            expect(result).to.be.equal(directorGeneral.address)
        })
        it('Returns surveyor General', async() => {
            const result = await  escrow.surveyorGeneral()
            expect(result).to.be.equal(surveyorGeneral.address)
        })
        it('Returns lender', async() => {
            const result = await  escrow.lender()
            expect(result).to.be.equal(lender.address)
        })
    })
    describe('listing', () => {
        
        it('updates ownership', async() => {
            expect(await landManagement.ownerOf(1)).to.be.equal(escrow.address)
        })
        it('updates oto listed', async() => {
            const result = await escrow.isListed(1)
            expect(result).to.be.equal(true)
        })
      
      
    })

})
